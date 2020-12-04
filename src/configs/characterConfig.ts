import { Attr } from '../../node_modules/lrparser-vnts/lib/utils/utils'
import { Config } from '../@types/config'

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
    { regex: /^"[\w\d./\\]*"/, tag: 'path', hasLexVal: true },
    { regex: /^#[ .#,\-!?\w\d]*#/, tag: 'text', hasLexVal: true },

    { regex: /^[\w]*/, tag: 'name', hasLexVal: true },
  ],
  action: [
    {
      stateName: 'DOWN',
      items: [
        { type: 'shift', fromState: 'character', toState: 'character2' },
        { type: 'shift', fromState: 'text', toState: 'text2' },
      ],
    },
    {
      stateName: 'MAIN',
      items: [{ type: 'finish', fromState: 'eof', toState: 'ok' }],
    },
    {
      stateName: 'CHARACTERS',
      items: [
        { type: 'shift', fromState: 'character', toState: 'character1' },
        { type: 'shift', fromState: 'end', toState: 'end' },
        { type: 'shift', fromState: 'text', toState: 'text2' },
      ],
    },
    {
      stateName: 'CHARACTER1',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: (CS, C) =>
            new Map<string, Attr>([
              ['list', [...CS.attr.get('list'), C.attr.get('char')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: (CS, C) =>
            new Map<string, Attr>([
              ['list', [...CS.attr.get('list'), C.attr.get('char')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: (CS, C) =>
            new Map<string, Attr>([
              ['list', [...CS.attr.get('list'), C.attr.get('char')]],
            ]),
        },
      ],
    },
    {
      stateName: 'CHARACTER2',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (COM, C) => new Map([['char', C.attr.get('char')]]),
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (COM, C) => new Map([['char', C.attr.get('char')]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (COM, C) => new Map([['char', C.attr.get('char')]]),
        },
      ],
    },
    {
      stateName: 'CHARACTER3',
      items: [
        { type: 'shift', fromState: 'character', toState: 'character1' },
        { type: 'shift', fromState: 'text', toState: 'text2' },
      ],
    },
    {
      stateName: 'CHARACTER4',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: (C1, C2) =>
            new Map([['list', [C1.attr.get('char'), C2.attr.get('char')]]]),
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: (C1, C2) =>
            new Map([['list', [C1.attr.get('char'), C2.attr.get('char')]]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTERS',
          countArgs: 2,
          func: (C1, C2) =>
            new Map([['list', [C1.attr.get('char'), C2.attr.get('char')]]]),
        },
      ],
    },
    {
      stateName: 'CHARACTER5',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (COM, C) => new Map([['char', C.attr.get('char')]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (COM, C) => new Map([['char', C.attr.get('char')]]),
        },
      ],
    },
    {
      stateName: 'COMMENT1',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (COM, C) => new Map([['char', C.attr.get('char')]]),
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (C, COM) => new Map([['char', C.attr.get('char')]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (C, COM) => new Map([['char', C.attr.get('char')]]),
        },
      ],
    },
    {
      stateName: 'COMMENT2',
      items: [
        { type: 'shift', fromState: 'character', toState: 'character1' },
        { type: 'shift', fromState: 'text', toState: 'text2' },
      ],
    },
    {
      stateName: 'COMMENT3',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (C, COM) => new Map([['char', C.attr.get('char')]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (C, COM) => new Map([['char', C.attr.get('char')]]),
        },
      ],
    },
    {
      stateName: 'COMMENT4',
      items: [
        {
          type: 'shift',
          fromState: 'character',
          toState: 'character2',
        },
        {
          type: 'shift',
          fromState: 'text',
          toState: 'text2',
        },
      ],
    },
    {
      stateName: 'COMMENT5',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (C, COM) => new Map([['char', C.attr.get('char')]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (C, COM) => new Map([['char', C.attr.get('char')]]),
        },
      ],
    },
    {
      stateName: 'SPRITES1',
      items: [
        {
          type: 'shift',
          fromState: 'name',
          toState: 'name2',
        },
        {
          type: 'shift',
          fromState: 'close',
          toState: '}1',
        },
      ],
    },
    {
      stateName: 'SPRITES2',
      items: [
        {
          type: 'shift',
          fromState: 'name',
          toState: 'name2',
        },
        {
          type: 'shift',
          fromState: 'close',
          toState: '}2',
        },
      ],
    },
    {
      stateName: 'SPRITE1',
      items: [
        {
          type: 'reduce',
          fromState: 'name',
          toState: 'SPRITES',
          countArgs: 2,
          func: (SS, S) =>
            new Map([['list', [...SS.attr.get('list'), S.attr.get('sprite')]]]),
        },
        {
          type: 'reduce',
          fromState: 'close',
          toState: 'SPRITES',
          countArgs: 2,
          func: (SS, S) =>
            new Map([['list', [...SS.attr.get('list'), S.attr.get('sprite')]]]),
        },
      ],
    },
    {
      stateName: 'SPRITE2',
      items: [{ type: 'shift', fromState: 'name', toState: 'name2' }],
    },
    {
      stateName: 'SPRITE3',
      items: [
        {
          type: 'reduce',
          fromState: 'name',
          toState: 'SPRITES',
          countArgs: 2,
          func: (S1, S2) =>
            new Map([['list', [S1.attr.get('sprite'), S2.attr.get('sprite')]]]),
        },
        {
          type: 'reduce',
          fromState: 'close',
          toState: 'SPRITES',
          countArgs: 2,
          func: (S1, S2) =>
            new Map([['list', [S1.attr.get('sprite'), S2.attr.get('sprite')]]]),
        },
      ],
    },
    {
      stateName: 'character1',
      items: [{ type: 'shift', fromState: 'name', toState: 'name1' }],
    },
    {
      stateName: 'character2',
      items: [{ type: 'shift', fromState: 'name', toState: 'name3' }],
    },
    {
      stateName: 'name1',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (c, n) => new Map([['char', { name: n.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (c, n) => new Map([['char', { name: n.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (c, n) => new Map([['char', { name: n.attr.get('val') }]]),
        },
        { type: 'shift', fromState: 'open', toState: '{1' },
      ],
    },
    {
      stateName: 'name2',
      items: [{ type: 'shift', fromState: 'field', toState: 'field' }],
    },
    {
      stateName: 'name3',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (c, n) => new Map([['char', { name: n.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 2,
          func: (c, n) => new Map([['char', { name: n.attr.get('val') }]]),
        },
        { type: 'shift', fromState: 'open', toState: '{2' },
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
          func: (CS, e) => new Map([['res', CS.attr.get('list')]]),
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
          fromState: 'name',
          toState: 'SPRITE',
          countArgs: 4,
          func: (n, f, eq, p) =>
            new Map([
              [
                'sprite',
                {
                  //TODO: delete char name from grammar
                  name: n.attr.get('val'),
                  field: f.attr.get('val'),
                  path: p.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'close',
          toState: 'SPRITE',
          countArgs: 4,
          func: (n, f, eq, p) =>
            new Map([
              [
                'sprite',
                {
                  name: n.attr.get('val'),
                  field: f.attr.get('val'),
                  path: p.attr.get('val'),
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'text1',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'COMMENT',
          countArgs: 1,
          func: t => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'SPRITE',
          countArgs: 3,
          func: (n, f, p) => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'SPRITE',
          countArgs: 3,
          func: (n, f, p) => new Map(),
        },
      ],
    },
    {
      stateName: 'text2',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'COMMENT',
          countArgs: 1,
          func: t => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'SPRITE',
          countArgs: 3,
          func: (n, f, p) => new Map(),
        },
      ],
    },
    {
      stateName: '=',
      items: [{ type: 'shift', fromState: 'path', toState: 'path' }],
    },
    {
      stateName: '{1',
      items: [{ type: 'shift', fromState: 'name', toState: 'name2' }],
    },
    {
      stateName: '{2',
      items: [{ type: 'shift', fromState: 'name', toState: 'name2' }],
    },
    {
      stateName: '}1',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 5,
          func: (c, n, op, SS, cl) =>
            new Map([
              [
                'char',
                { name: n.attr.get('val'), sprites: SS.attr.get('list') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'end',
          toState: 'CHARACTER',
          countArgs: 5,
          func: (c, n, op, SS, cl) =>
            new Map([
              [
                'char',
                { name: n.attr.get('val'), sprites: SS.attr.get('list') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 5,
          func: (c, n, op, SS, cl) =>
            new Map([
              [
                'char',
                { name: n.attr.get('val'), sprites: SS.attr.get('list') },
              ],
            ]),
        },
      ],
    },
    {
      stateName: '}2',
      items: [
        {
          type: 'reduce',
          fromState: 'character',
          toState: 'CHARACTER',
          countArgs: 5,
          func: (c, n, op, SS, cl) =>
            new Map([
              [
                'char',
                { name: n.attr.get('val'), sprites: SS.attr.get('list') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'text',
          toState: 'CHARACTER',
          countArgs: 5,
          func: (c, n, op, SS, cl) =>
            new Map([
              [
                'char',
                { name: n.attr.get('val'), sprites: SS.attr.get('list') },
              ],
            ]),
        },
      ],
    },
  ],
  goto: [
    {
      stateName: 'DOWN',
      items: [
        { newState: 'MAIN', nameState: 'MAIN' },
        { newState: 'CHARACTERS', nameState: 'CHARACTERS' },
        { newState: 'CHARACTER', nameState: 'CHARACTER3' },
        { newState: 'COMMENT', nameState: 'COMMENT4' },
      ],
    },
    {
      stateName: 'CHARACTERS',
      items: [
        { newState: 'CHARACTER', nameState: 'CHARACTER1' },
        { newState: 'COMMENT', nameState: 'COMMENT2' },
      ],
    },
    {
      stateName: 'CHARACTER1',
      items: [{ newState: 'COMMENT', nameState: 'COMMENT1' }],
    },
    {
      stateName: 'CHARACTER2',
      items: [{ newState: 'COMMENT', nameState: 'COMMENT1' }],
    },
    {
      stateName: 'CHARACTER3',
      items: [
        { newState: 'CHARACTER', nameState: 'CHARACTER4' },
        { newState: 'COMMENT', nameState: 'COMMENT3' },
      ],
    },
    {
      stateName: 'CHARACTER4',
      items: [{ newState: 'COMMENT', nameState: 'COMMENT1' }],
    },
    {
      stateName: 'CHARACTER5',
      items: [{ newState: 'COMMENT', nameState: 'COMMENT5' }],
    },
    {
      stateName: 'COMMENT2',
      items: [
        { newState: 'CHARACTER', nameState: 'CHARACTER2' },
        { newState: 'COMMENT', nameState: 'COMMENT2' },
      ],
    },
    {
      stateName: 'COMMENT3',
      items: [
        { newState: 'CHARACTER', nameState: 'CHARACTER2' },
        { newState: 'COMMENT', nameState: 'COMMENT2' },
      ],
    },
    {
      stateName: 'COMMENT4',
      items: [
        { newState: 'CHARACTER', nameState: 'CHARACTER5' },
        { newState: 'COMMENT', nameState: 'COMMENT4' },
      ],
    },
    {
      stateName: 'SPRITES1',
      items: [{ newState: 'SPRITE', nameState: 'SPRITE1' }],
    },
    {
      stateName: 'SPRITES2',
      items: [{ newState: 'SPRITE', nameState: 'SPRITE1' }],
    },
    {
      stateName: 'SPRITE2',
      items: [{ newState: 'SPRITE', nameState: 'SPRITE3' }],
    },
    {
      stateName: '{1',
      items: [
        { newState: 'SPRITES', nameState: 'SPRITES1' },
        { newState: 'SPRITE', nameState: 'SPRITE2' },
      ],
    },
    {
      stateName: '{2',
      items: [
        { newState: 'SPRITES', nameState: 'SPRITES2' },
        { newState: 'SPRITE', nameState: 'SPRITE2' },
      ],
    },
  ],
}

export default characterConfig
