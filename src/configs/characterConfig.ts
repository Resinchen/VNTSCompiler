import { Config, ReduceFunc } from '../@types/config'
import Character from '../gameObjects/character'
import Sprite from '../gameObjects/sprite'

const updateCharacterList: ReduceFunc = (CS, C) =>
  new Map([['list', [...CS.attr.get('list'), C.attr.get('char')]]])
const createCharacterList: ReduceFunc = (C1, C2) =>
  new Map([['list', [C1.attr.get('char'), C2.attr.get('char')]]])

const updateSpriteList: ReduceFunc = (SS, S) =>
  new Map([['list', [...SS.attr.get('list'), S.attr.get('sprite')]]])
const createSpriteList: ReduceFunc = (S1, S2) =>
  new Map([['list', [S1.attr.get('sprite'), S2.attr.get('sprite')]]])

const createCharacterWithoutSprites: ReduceFunc = (c, n) =>
  new Map([['char', new Character(n.attr.get('val'))]])
const createCharacter: ReduceFunc = (c, n, op, SS, cl) =>
  new Map([['char', new Character(n.attr.get('val'), SS.attr.get('list'))]])

const createSprite: ReduceFunc = (f, e, p) =>
  new Map([['sprite', new Sprite(f.attr.get('val'), p.attr.get('val'))]])

const prepareResult: ReduceFunc = (CS, e) =>
  new Map([['res', CS.attr.get('list')]])

const characterConfig: Config = {
  patterns: [
    { regex: /^[ \n\t]+/, tag: 'None', hasLexVal: false },
    { regex: /^{/, tag: 'open', hasLexVal: false },
    { regex: /^}/, tag: 'close', hasLexVal: false },
    { regex: /^=/, tag: 'equals', hasLexVal: false },
    { regex: /^Character/, tag: 'character', hasLexVal: false },
    { regex: /^### End of defines ###/, tag: 'end', hasLexVal: false },
    { regex: /^playerName/, tag: 'name', hasLexVal: true },

    { regex: /^\.[\w]*/, tag: 'field', hasLexVal: true },
    { regex: /^#[\w\d ]*#/, tag: 'None', hasLexVal: false },
    { regex: /^"[\w\d./\\]*"/, tag: 'path', hasLexVal: true },

    { regex: /^[\w]*/, tag: 'name', hasLexVal: true },
  ],
  action: [
    {
      stateName: 'DOWN',
      items: [{ type: 'shift', fromState: 'character', toState: 'character' }],
    },
    {
      stateName: 'MAIN',
      items: [{ type: 'finish', fromState: 'eof', toState: 'ok' }],
    },
    {
      stateName: 'CHARACTERS',
      items: [
        { type: 'shift', fromState: 'character', toState: 'character' },
        { type: 'shift', fromState: 'end', toState: 'end' },
      ],
    },
    {
      stateName: 'CHARACTER1',
      items: [{ type: 'shift', fromState: 'character', toState: 'character' }],
    },
    {
      stateName: 'CHARACTER2',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: updateCharacterList,
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: updateCharacterList,
        },
      ],
    },
    {
      stateName: 'CHARACTER3',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: createCharacterList,
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: createCharacterList,
        },
      ],
    },
    {
      stateName: 'SPRITES',
      items: [
        { type: 'shift', fromState: 'field', toState: 'field' },
        { type: 'shift', fromState: 'close', toState: '}' },
      ],
    },
    {
      stateName: 'SPRITES',
      items: [
        { type: 'shift', fromState: 'field', toState: 'field' },
        { type: 'shift', fromState: 'close', toState: '}' },
      ],
    },
    {
      stateName: 'SPRITE1',
      items: [{ type: 'shift', fromState: 'field', toState: 'field' }],
    },
    {
      stateName: 'SPRITE2',
      items: [
        {
          type: 'reduce',
          fromState: 'field',
          toState: 'SPRITES',
          countArgs: 2,
          func: updateSpriteList,
        },
        {
          type: 'reduce',
          fromState: 'close',
          toState: 'SPRITES',
          countArgs: 2,
          func: updateSpriteList,
        },
      ],
    },
    {
      stateName: 'SPRITE3',
      items: [
        {
          type: 'reduce',
          fromState: 'field',
          toState: 'SPRITES',
          countArgs: 2,
          func: createSpriteList,
        },
        {
          type: 'reduce',
          fromState: 'close',
          toState: 'SPRITES',
          countArgs: 2,
          func: createSpriteList,
        },
      ],
    },
    {
      stateName: 'character',
      items: [{ type: 'shift', fromState: 'name', toState: 'name' }],
    },
    {
      stateName: 'name',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: createCharacterWithoutSprites,
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTER',
          countArgs: 2,
          func: createCharacterWithoutSprites,
        },
        { type: 'shift', fromState: 'open', toState: '{' },
      ],
    },
    {
      stateName: 'end',
      items: [
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'MAIN',
          countArgs: 2,
          func: prepareResult,
        },
      ],
    },
    {
      stateName: 'field',
      items: [{ type: 'shift', fromState: 'equals', toState: '=' }],
    },
    {
      stateName: 'path',
      items: [
        {
          type: 'reduce',
          fromState: 'field',
          toState: 'SPRITE',
          countArgs: 3,
          func: createSprite,
        },
        {
          type: 'reduce',
          fromState: 'close',
          toState: 'SPRITE',
          countArgs: 3,
          func: createSprite,
        },
      ],
    },
    {
      stateName: '=',
      items: [{ type: 'shift', fromState: 'path', toState: 'path' }],
    },
    {
      stateName: '{1',
      items: [{ type: 'shift', fromState: 'field', toState: 'field' }],
    },
    {
      stateName: '}',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 5,
          func: createCharacter,
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTER',
          countArgs: 5,
          func: createCharacter,
        },
      ],
    },
  ],
  goto: [
    {
      stateName: 'DOWN',
      items: [
        // { newState: 'MAIN', nameState: 'MAIN' },
        { newState: 'CHARACTERS', nameState: 'CHARACTERS' },
        { newState: 'CHARACTER', nameState: 'CHARACTER1' },
      ],
    },
    {
      stateName: 'CHARACTERS',
      items: [{ newState: 'CHARACTER', nameState: 'CHARACTER2' }],
    },
    {
      stateName: 'CHARACTER1',
      items: [{ newState: 'CHARACTER', nameState: 'CHARACTER3' }],
    },
    {
      stateName: 'SPRITES',
      items: [{ newState: 'SPRITE', nameState: 'SPRITE2' }],
    },
    {
      stateName: 'SPRITE1',
      items: [{ newState: 'SPRITE', nameState: 'SPRITE3' }],
    },
    {
      stateName: '{',
      items: [
        { newState: 'SPRITES', nameState: 'SPRITES' },
        { newState: 'SPRITE', nameState: 'SPRITE1' },
      ],
    },
  ],
}

export default characterConfig
