import { Config, ReduceFunc } from '../@types/config'
import Choice, { Effect, Variant } from '../gameObjects/actions/choice'
import Jump from '../gameObjects/actions/jump'
import LoadScene from '../gameObjects/actions/loadscene'
import Mark from '../gameObjects/actions/mark'
import Phrase, { Options } from '../gameObjects/actions/phrase'
import Play, { PlayType } from '../gameObjects/actions/play'
import Set, { SetType } from '../gameObjects/actions/set'
import Varle, {
  CompositeCondition,
  SimpleCondition,
} from '../gameObjects/actions/varle'
import CharacterLink from '../gameObjects/characterLink'
import File from '../gameObjects/file'

const prepareResult: ReduceFunc = (LL, AL) =>
  new Map([
    [
      'res',
      {
        chars: LL.attr.get('chars'),
        files: LL.attr.get('files'),
        actions: AL.attr.get('list'),
      },
    ],
  ])

const updateLoadlist: ReduceFunc = (LL, L) =>
  new Map([
    ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
    ['files', [...LL.attr.get('files'), L.attr.get('file')]],
  ])
const createLoadlist: ReduceFunc = (L1, L2) =>
  new Map([
    ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
    ['files', [L1.attr.get('file'), L2.attr.get('file')]],
  ])

const updateActionlist: ReduceFunc = (AL, A) =>
  new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]])
const createActionlist: ReduceFunc = (A1, A2) =>
  new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]])

const makeActionFromSet: ReduceFunc = S =>
  new Map([['action', S.attr.get('set')]])
const makeActionFromPlay: ReduceFunc = P =>
  new Map([['action', P.attr.get('play')]])
const makeActionFromPhrase: ReduceFunc = P =>
  new Map([['action', P.attr.get('phrase')]])
const makeActionFromChoice: ReduceFunc = C =>
  new Map([['action', C.attr.get('choice')]])
const makeActionFromVarle: ReduceFunc = C =>
  new Map([['action', C.attr.get('varle')]])
const makeActionFromJump: ReduceFunc = J =>
  new Map([['action', J.attr.get('jump')]])
const makeActionFromMark: ReduceFunc = M =>
  new Map([['action', M.attr.get('mark')]])
const makeActionFromLoadscene: ReduceFunc = L =>
  new Map([['action', L.attr.get('next_scene')]])

const createLoad: ReduceFunc = (l, W) =>
  new Map([
    ['char', W.attr.get('char')],
    ['file', W.attr.get('file')],
  ])
const createSet: ReduceFunc = (s, W) =>
  new Map([['set', new Set(W.attr.get('type'), W.attr.get('info'))]])
const createPlay: ReduceFunc = (p, W) =>
  new Map([['play', new Play(W.attr.get('type'), W.attr.get('info'))]])
const createPhrase: ReduceFunc = (l, O, s, w) =>
  new Map([
    [
      'phrase',
      new Phrase(l.attr.get('val'), w.attr.get('val'), O.attr.get('opt')),
    ],
  ])
const createPhraseWithoutOptions: ReduceFunc = (l, s, w) =>
  new Map([['phrase', new Phrase(l.attr.get('val'), w.attr.get('val'))]])
const createChoice: ReduceFunc = (P, V) =>
  new Map([['choice', new Choice(P.attr.get('phrase'), V.attr.get('list'))]])
const createVarle: ReduceFunc = (i, C, J) =>
  new Map([['varle', new Varle(C.attr.get('boollist'), J.attr.get('jump'))]])
const createJump: ReduceFunc = (j, mn) =>
  new Map([['jump', new Jump(mn.attr.get('val'))]])
const createMark: ReduceFunc = (m, mn) =>
  new Map([['mark', new Mark(mn.attr.get('val'))]])
const createLoadscene: ReduceFunc = (l, p) =>
  new Map([['next_scene', new LoadScene(p.attr.get('val'))]])

const createVarlist: ReduceFunc = V =>
  new Map([['list', [V.attr.get('variant')]]])
const updateVarlist: ReduceFunc = (VL, s, V) =>
  new Map([['list', [...VL.attr.get('list'), V.attr.get('variant')]]])

const createVariants: ReduceFunc = (op, VL, cl) =>
  new Map([['list', VL.attr.get('list')]])
const createVariantSingleEffect: ReduceFunc = (w, s, E) =>
  new Map([['variant', new Variant(w.attr.get('val'), [E.attr.get('effect')])]])
const createVariantMultiEffect: ReduceFunc = (w, s, EL) =>
  new Map([['variant', new Variant(w.attr.get('val'), EL.attr.get('list'))]])

const createEffectlist: ReduceFunc = (E1, c, E2) =>
  new Map([['list', [E1.attr.get('effect'), E2.attr.get('effect')]]])
const createEffectFlag: ReduceFunc = (f, e, b) =>
  new Map([
    ['effect', new Effect('set_flag', f.attr.get('val'), b.attr.get('val'))],
  ])
const createEffectCounter: ReduceFunc = (cn, op, d) =>
  new Map([
    [
      'effect',
      new Effect(
        'change_counter',
        cn.attr.get('val'),
        d.attr.get('val'),
        op.attr.get('val')
      ),
    ],
  ])

const createOptionsPosition: ReduceFunc = (o, p, c) =>
  new Map([['opt', new Options(p.attr.get('val'))]])
const createOptionsEmotion: ReduceFunc = (o, e, c) =>
  new Map([['opt', new Options(undefined, e.attr.get('val'))]])
const createOptionsPositionAndEmotion: ReduceFunc = (o, p, c, e, cl) =>
  new Map([['opt', new Options(p.attr.get('val'), e.attr.get('val'))]])

const createConditionCounter: ReduceFunc = (cn, bo, d) =>
  new Map([
    [
      'boollist',
      new SimpleCondition(
        'check_counter',
        cn.attr.get('val'),
        bo.attr.get('val'),
        d.attr.get('val')
      ),
    ],
  ])
const createConditionFlag: ReduceFunc = (f, i, b) =>
  new Map([
    [
      'boollist',
      new SimpleCondition(
        'check_flag',
        f.attr.get('val'),
        'is',
        b.attr.get('val')
      ),
    ],
  ])
const createConditionAnd: ReduceFunc = (C1, a, C2) =>
  new Map([
    [
      'boollist',
      new CompositeCondition(
        C1.attr.get('boollist'),
        'and',
        C2.attr.get('boollist')
      ),
    ],
  ])
const createConditionOr: ReduceFunc = (C1, o, C2) =>
  new Map([
    [
      'boollist',
      new CompositeCondition(
        C1.attr.get('boollist'),
        'or',
        C2.attr.get('boollist')
      ),
    ],
  ])
const createConditionNot: ReduceFunc = (n, C) =>
  new Map([
    [
      'boollist',
      new CompositeCondition(undefined, 'not', C.attr.get('boollist')),
    ],
  ])

const createSetBackground: ReduceFunc = (b, n) =>
  new Map([
    ['type', SetType.Background],
    ['info', n.attr.get('val')],
  ])
const createSetText: ReduceFunc = (t, w) =>
  new Map([
    ['type', SetType.Text],
    ['info', w.attr.get('val')],
  ])
const createSetBlackout: ReduceFunc = b => new Map([['type', SetType.Blackout]])

const createPlaySound: ReduceFunc = (s, n) =>
  new Map([
    ['type', PlayType.Sound],
    ['info', n.attr.get('val')],
  ])

const createLoadCharacter: ReduceFunc = (c, n, s, l) =>
  new Map([['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))]])
const createLoadImage: ReduceFunc = (s, p) =>
  new Map([['file', new File('image', p.attr.get('val'))]])
const createLoadSound: ReduceFunc = (s, p) =>
  new Map([['file', new File('sound', p.attr.get('val'))]])

const sceneConfig: Config = {
  patterns: [
    { regex: /^[ \n\t\r]+/, tag: 'None', hasLexVal: false },
    { regex: /^#[\w\d ]*#/, tag: 'None', hasLexVal: false },
    { regex: /^load_scene/, tag: 'load_scene', hasLexVal: false },
    { regex: /^load/, tag: 'load', hasLexVal: false },
    { regex: /^character/, tag: 'character', hasLexVal: false },
    { regex: /^image/, tag: 'image', hasLexVal: false },
    { regex: /^sound/, tag: 'sound', hasLexVal: false },
    { regex: /^play/, tag: 'play', hasLexVal: false },
    { regex: /^set/, tag: 'set', hasLexVal: false },
    { regex: /^jump/, tag: 'jump', hasLexVal: false },
    { regex: /^background/, tag: 'background', hasLexVal: false },
    { regex: /^text/, tag: 'text', hasLexVal: false },
    { regex: /^blackout/, tag: 'blackout', hasLexVal: false },
    { regex: /^(left|center|right)/, tag: 'position', hasLexVal: true },
    { regex: /^mark[^_]/, tag: 'mark', hasLexVal: false },
    { regex: /^if/, tag: 'if', hasLexVal: false },
    { regex: /^and/, tag: 'and', hasLexVal: false },
    { regex: /^or/, tag: 'or', hasLexVal: false },
    { regex: /^not/, tag: 'not', hasLexVal: false },
    { regex: /^is/, tag: 'is', hasLexVal: false },
    { regex: /^:/, tag: 'colon', hasLexVal: false },
    { regex: /^{/, tag: 'curly_brackets_open', hasLexVal: false },
    { regex: /^}/, tag: 'curly_brackets_close', hasLexVal: false },
    { regex: /^\(/, tag: 'brackets_open', hasLexVal: false },
    { regex: /^\)/, tag: 'brackets_close', hasLexVal: false },
    { regex: /^;/, tag: 'semicolon', hasLexVal: false },
    { regex: /^,/, tag: 'comma', hasLexVal: false },
    { regex: /^=/, tag: 'equals', hasLexVal: false },
    { regex: /^([0-9]|[1-9][0-9]+)/, tag: 'digit', hasLexVal: true },
    { regex: /^(-|\+)/, tag: 'digit_op', hasLexVal: true },
    { regex: /^(true|false)/, tag: 'bool', hasLexVal: true },
    { regex: /^[<|>]=?/, tag: 'bool_op', hasLexVal: true },
    { regex: /^mark_[_\w]+/, tag: 'mark_name', hasLexVal: true },
    { regex: /^counter_[_\w]+/, tag: 'counter_name', hasLexVal: true },
    { regex: /^flag_[_\w]+/, tag: 'flag_name', hasLexVal: true },
    { regex: /^\'\w[\w\d\./\\]+\'/, tag: 'path', hasLexVal: true },
    { regex: /^\"[ \.\,\-\!\?\w\d{}<>/`]*\"/, tag: 'words', hasLexVal: true },
    { regex: /^\w[_\w]+/, tag: 'word', hasLexVal: true },
    { regex: /^\w/, tag: 'label', hasLexVal: true },
  ],
  action: [
    {
      stateName: 'DOWN',
      items: [{ type: 'shift', fromState: 'load', toState: 'load' }],
    },
    {
      stateName: 'MAIN',
      items: [{ type: 'finish', fromState: 'eof', toState: 'ok' }],
    },
    {
      stateName: 'LOADLIST',
      items: [
        { type: 'shift', fromState: 'load', toState: 'load' },
        { type: 'shift', fromState: 'label', toState: 'label1' },
        { type: 'shift', fromState: 'set', toState: 'set' },
        { type: 'shift', fromState: 'play', toState: 'play' },
        { type: 'shift', fromState: 'if', toState: 'if' },
        { type: 'shift', fromState: 'jump', toState: 'jump' },
        { type: 'shift', fromState: 'mark', toState: 'mark' },
        { type: 'shift', fromState: 'load_scene', toState: 'load_scene' },
      ],
    },
    {
      stateName: 'ACTIONLIST',
      items: [
        { type: 'shift', fromState: 'label', toState: 'label1' },
        { type: 'shift', fromState: 'set', toState: 'set' },
        { type: 'shift', fromState: 'play', toState: 'play' },
        { type: 'shift', fromState: 'if', toState: 'if' },
        { type: 'shift', fromState: 'jump', toState: 'jump' },
        { type: 'shift', fromState: 'mark', toState: 'mark' },
        { type: 'shift', fromState: 'load_scene', toState: 'load_scene' },
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
      stateName: 'LOAD1',
      items: [{ type: 'shift', fromState: 'load', toState: 'load' }],
    },
    {
      stateName: 'LOAD2',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADLIST',
          countArgs: 2,
          func: updateLoadlist,
        },
      ],
    },
    {
      stateName: 'LOAD3',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADLIST',
          countArgs: 2,
          func: createLoadlist,
        },
      ],
    },
    {
      stateName: 'ACTION1',
      items: [
        { type: 'shift', fromState: 'label', toState: 'label1' },
        { type: 'shift', fromState: 'set', toState: 'set' },
        { type: 'shift', fromState: 'play', toState: 'play' },
        { type: 'shift', fromState: 'if', toState: 'if' },
        { type: 'shift', fromState: 'jump', toState: 'jump' },
        { type: 'shift', fromState: 'mark', toState: 'mark' },
        { type: 'shift', fromState: 'load_scene', toState: 'load_scene' },
      ],
    },
    {
      stateName: 'ACTION2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: createActionlist,
        },
      ],
    },
    {
      stateName: 'ACTION3',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: updateActionlist,
        },
      ],
    },
    {
      stateName: 'SET',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromSet,
        },
      ],
    },
    {
      stateName: 'PLAY',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPlay,
        },
      ],
    },
    {
      stateName: 'PHR',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        { type: 'shift', fromState: 'curly_brackets_open', toState: '{' },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
      ],
    },
    {
      stateName: 'PHRWE',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        { type: 'shift', fromState: 'curly_brackets_open', toState: '{' },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromPhrase,
        },
      ],
    },
    {
      stateName: 'CHOICE',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromChoice,
        },
      ],
    },
    {
      stateName: 'VARLE',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromVarle,
        },
      ],
    },
    {
      stateName: 'JUMP1',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromJump,
        },
      ],
    },
    {
      stateName: 'JUMP2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'VARLE',
          countArgs: 3,
          func: createVarle,
        },
      ],
    },
    {
      stateName: 'MARK',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromMark,
        },
      ],
    },
    {
      stateName: 'LOADSCENE',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: makeActionFromLoadscene,
        },
      ],
    },
    {
      stateName: 'WHLOAD',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOAD',
          countArgs: 2,
          func: createLoad,
        },
      ],
    },
    {
      stateName: 'WHSET',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'SET',
          countArgs: 2,
          func: createSet,
        },
      ],
    },
    {
      stateName: 'WHPLAY',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'PLAY',
          countArgs: 2,
          func: createPlay,
        },
      ],
    },
    {
      stateName: 'VARS',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'CHOICE',
          countArgs: 2,
          func: createChoice,
        },
      ],
    },
    {
      stateName: 'VAR1',
      items: [
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'VARLIST',
          countArgs: 1,
          func: createVarlist,
        },
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'VARLIST',
          countArgs: 1,
          func: createVarlist,
        },
      ],
    },
    {
      stateName: 'VAR2',
      items: [
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'VARLIST',
          countArgs: 3,
          func: updateVarlist,
        },
      ],
    },
    {
      stateName: 'EFF1',
      items: [
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'VAR',
          countArgs: 3,
          func: createVariantSingleEffect,
        },
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'VAR',
          countArgs: 3,
          func: createVariantSingleEffect,
        },
        { type: 'shift', fromState: 'comma', toState: ',2' },
      ],
    },
    {
      stateName: 'EFF2',
      items: [
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'EFFLIST',
          countArgs: 3,
          func: createEffectlist,
        },
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'EFFLIST',
          countArgs: 3,
          func: createEffectlist,
        },
      ],
    },
    {
      stateName: 'EFFLIST',
      items: [
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'VAR',
          countArgs: 3,
          func: createVariantMultiEffect,
        },
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'VAR',
          countArgs: 3,
          func: createVariantMultiEffect,
        },
      ],
    },
    {
      stateName: 'COND1',
      items: [
        { type: 'shift', fromState: 'jump', toState: 'jump' },
        { type: 'shift', fromState: 'and', toState: 'and' },
        { type: 'shift', fromState: 'or', toState: 'or' },
      ],
    },
    {
      stateName: 'COND2',
      items: [
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COND',
          countArgs: 3,
          func: createConditionAnd,
        },
        {
          type: 'reduce',
          fromState: 'and',
          toState: 'COND',
          countArgs: 3,
          func: createConditionAnd,
        },
        {
          type: 'reduce',
          fromState: 'or',
          toState: 'COND',
          countArgs: 3,
          func: createConditionAnd,
        },
        { type: 'shift', fromState: 'not', toState: 'not' },
        { type: 'shift', fromState: 'and', toState: 'and' },
        { type: 'shift', fromState: 'or', toState: 'or' },
      ],
    },
    {
      stateName: 'COND3',
      items: [
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COND',
          countArgs: 3,
          func: createConditionOr,
        },
        {
          type: 'reduce',
          fromState: 'and',
          toState: 'COND',
          countArgs: 3,
          func: createConditionOr,
        },
        {
          type: 'reduce',
          fromState: 'or',
          toState: 'COND',
          countArgs: 3,
          func: createConditionOr,
        },
        { type: 'shift', fromState: 'and', toState: 'and' },
        { type: 'shift', fromState: 'or', toState: 'or' },
      ],
    },
    {
      stateName: 'COND4',
      items: [
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COND',
          countArgs: 2,
          func: createConditionNot,
        },
        {
          type: 'reduce',
          fromState: 'and',
          toState: 'COND',
          countArgs: 2,
          func: createConditionNot,
        },
        {
          type: 'reduce',
          fromState: 'or',
          toState: 'COND',
          countArgs: 2,
          func: createConditionNot,
        },
        { type: 'shift', fromState: 'and', toState: 'and' },
        { type: 'shift', fromState: 'or', toState: 'or' },
      ],
    },
    {
      stateName: 'OPTIONS',
      items: [{ type: 'shift', fromState: 'colon', toState: ':2' }],
    },
    {
      stateName: 'VARLIST',
      items: [
        { type: 'shift', fromState: 'semicolon', toState: ';' },
        { type: 'shift', fromState: 'curly_brackets_close', toState: '}' },
      ],
    },
    {
      stateName: 'load',
      items: [
        { type: 'shift', fromState: 'character', toState: 'character' },
        { type: 'shift', fromState: 'image', toState: 'image' },
        { type: 'shift', fromState: 'sound', toState: 'sound1' },
      ],
    },
    {
      stateName: 'character',
      items: [{ type: 'shift', fromState: 'word', toState: 'name1' }],
    },
    {
      stateName: 'name1',
      items: [{ type: 'shift', fromState: 'colon', toState: ':4' }],
    },
    {
      stateName: 'name2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetBackground,
        },
      ],
    },
    {
      stateName: 'name3',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHPLAY',
          countArgs: 2,
          func: createPlaySound,
        },
      ],
    },
    {
      stateName: ':1',
      items: [{ type: 'shift', fromState: 'words', toState: 'words2' }],
    },
    {
      stateName: ':2',
      items: [{ type: 'shift', fromState: 'words', toState: 'words3' }],
    },
    {
      stateName: ':3',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name1' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name1' },
      ],
    },
    {
      stateName: ':4',
      items: [{ type: 'shift', fromState: 'label', toState: 'label2' }],
    },
    {
      stateName: 'label1',
      items: [
        { type: 'shift', fromState: 'colon', toState: ':1' },
        { type: 'shift', fromState: 'brackets_open', toState: '(' },
      ],
    },
    {
      stateName: 'label2',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHLOAD',
          countArgs: 4,
          func: createLoadCharacter,
        },
      ],
    },
    {
      stateName: 'image',
      items: [{ type: 'shift', fromState: 'path', toState: 'path2' }],
    },
    {
      stateName: 'path1',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: createLoadscene,
        },
      ],
    },
    {
      stateName: 'path2',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadImage,
        },
      ],
    },
    {
      stateName: 'path3',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHLOAD',
          countArgs: 2,
          func: createLoadSound,
        },
      ],
    },
    {
      stateName: 'sound1',
      items: [{ type: 'shift', fromState: 'path', toState: 'path3' }],
    },
    {
      stateName: 'sound2',
      items: [{ type: 'shift', fromState: 'word', toState: 'name3' }],
    },
    {
      stateName: 'set',
      items: [
        { type: 'shift', fromState: 'background', toState: 'background' },
        { type: 'shift', fromState: 'text', toState: 'text' },
        { type: 'shift', fromState: 'blackout', toState: 'blackout' },
      ],
    },
    {
      stateName: 'background',
      items: [{ type: 'shift', fromState: 'word', toState: 'name2' }],
    },
    {
      stateName: 'text',
      items: [{ type: 'shift', fromState: 'words', toState: 'words1' }],
    },
    {
      stateName: 'words1',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHSET',
          countArgs: 2,
          func: createSetText,
        },
      ],
    },
    {
      stateName: 'words2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_open',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'PHRWE',
          countArgs: 3,
          func: createPhraseWithoutOptions,
        },
      ],
    },
    {
      stateName: 'words3',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_open',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'PHR',
          countArgs: 4,
          func: createPhrase,
        },
      ],
    },
    {
      stateName: 'words4',
      items: [{ type: 'shift', fromState: 'colon', toState: ':3' }],
    },
    {
      stateName: 'blackout',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHSET',
          countArgs: 1,
          func: createSetBlackout,
        },
      ],
    },
    {
      stateName: 'play',
      items: [{ type: 'shift', fromState: 'sound', toState: 'sound2' }],
    },
    {
      stateName: 'position',
      items: [
        { type: 'shift', fromState: 'comma', toState: ',1' },
        { type: 'shift', fromState: 'brackets_close', toState: ')1' },
      ],
    },
    {
      stateName: 'emotion1',
      items: [{ type: 'shift', fromState: 'brackets_close', toState: ')2' }],
    },
    {
      stateName: 'emotion2',
      items: [{ type: 'shift', fromState: 'brackets_close', toState: ')3' }],
    },
    {
      stateName: '{',
      items: [{ type: 'shift', fromState: 'words', toState: 'words4' }],
    },
    {
      stateName: ';',
      items: [{ type: 'shift', fromState: 'words', toState: 'words4' }],
    },
    {
      stateName: '}',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'VARS',
          countArgs: 3,
          func: createVariants,
        },
      ],
    },
    {
      stateName: 'flag_name1',
      items: [{ type: 'shift', fromState: 'equals', toState: '=' }],
    },
    {
      stateName: 'flag_name2',
      items: [{ type: 'shift', fromState: 'is', toState: 'is' }],
    },
    {
      stateName: '=',
      items: [{ type: 'shift', fromState: 'bool', toState: 'bool1' }],
    },
    {
      stateName: 'bool1',
      items: [
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'EFF',
          countArgs: 3,
          func: createEffectFlag,
        },
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'EFF',
          countArgs: 3,
          func: createEffectFlag,
        },
        {
          type: 'reduce',
          fromState: 'comma',
          toState: 'EFF',
          countArgs: 3,
          func: createEffectFlag,
        },
      ],
    },
    {
      stateName: 'bool2',
      items: [
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COND',
          countArgs: 3,
          func: createConditionFlag,
        },
        {
          type: 'reduce',
          fromState: 'and',
          toState: 'COND',
          countArgs: 3,
          func: createConditionFlag,
        },
        {
          type: 'reduce',
          fromState: 'or',
          toState: 'COND',
          countArgs: 3,
          func: createConditionFlag,
        },
        {
          type: 'reduce',
          fromState: 'not',
          toState: 'COND',
          countArgs: 3,
          func: createConditionFlag,
        },
      ],
    },
    {
      stateName: 'counter_name1',
      items: [{ type: 'shift', fromState: 'digit_op', toState: 'digit_op' }],
    },
    {
      stateName: 'counter_name2',
      items: [{ type: 'shift', fromState: 'bool_op', toState: 'bool_op' }],
    },
    {
      stateName: 'digit_op',
      items: [{ type: 'shift', fromState: 'digit', toState: 'digit1' }],
    },
    {
      stateName: 'digit1',
      items: [
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'EFF',
          countArgs: 3,
          func: createEffectCounter,
        },
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'EFF',
          countArgs: 3,
          func: createEffectCounter,
        },
        {
          type: 'reduce',
          fromState: 'comma',
          toState: 'EFF',
          countArgs: 3,
          func: createEffectCounter,
        },
      ],
    },
    {
      stateName: 'digit2',
      items: [
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COND',
          countArgs: 3,
          func: createConditionCounter,
        },
        {
          type: 'reduce',
          fromState: 'and',
          toState: 'COND',
          countArgs: 3,
          func: createConditionCounter,
        },
        {
          type: 'reduce',
          fromState: 'or',
          toState: 'COND',
          countArgs: 3,
          func: createConditionCounter,
        },
        {
          type: 'reduce',
          fromState: 'not',
          toState: 'COND',
          countArgs: 3,
          func: createConditionCounter,
        },
      ],
    },
    {
      stateName: ',1',
      items: [{ type: 'shift', fromState: 'word', toState: 'emotion2' }],
    },
    {
      stateName: ',2',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name1' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name1' },
      ],
    },
    {
      stateName: 'if',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name2' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name2' },
        { type: 'shift', fromState: 'not', toState: 'not' },
      ],
    },
    {
      stateName: 'is',
      items: [{ type: 'shift', fromState: 'bool', toState: 'bool2' }],
    },
    {
      stateName: 'bool_op',
      items: [{ type: 'shift', fromState: 'digit', toState: 'digit2' }],
    },
    {
      stateName: 'jump',
      items: [{ type: 'shift', fromState: 'mark_name', toState: 'mark_name2' }],
    },
    {
      stateName: 'mark_name2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'JUMP',
          countArgs: 2,
          func: createJump,
        },
      ],
    },
    {
      stateName: 'mark_name1',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'MARK',
          countArgs: 2,
          func: createMark,
        },
      ],
    },
    {
      stateName: 'mark',
      items: [{ type: 'shift', fromState: 'mark_name', toState: 'mark_name1' }],
    },
    {
      stateName: 'and',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name2' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name2' },
        { type: 'shift', fromState: 'not', toState: 'not' },
      ],
    },
    {
      stateName: 'or',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name2' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name2' },
        { type: 'shift', fromState: 'not', toState: 'not' },
      ],
    },
    {
      stateName: 'not',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name2' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name2' },
        { type: 'shift', fromState: 'not', toState: 'not' },
      ],
    },
    {
      stateName: '(',
      items: [
        { type: 'shift', fromState: 'position', toState: 'position' },
        { type: 'shift', fromState: 'word', toState: 'emotion1' },
      ],
    },
    {
      stateName: ')1',
      items: [
        {
          type: 'reduce',
          fromState: 'colon',
          toState: 'OPTIONS',
          countArgs: 3,
          func: createOptionsPosition,
        },
      ],
    },
    {
      stateName: ')2',
      items: [
        {
          type: 'reduce',
          fromState: 'colon',
          toState: 'OPTIONS',
          countArgs: 3,
          func: createOptionsEmotion,
        },
      ],
    },
    {
      stateName: ')3',
      items: [
        {
          type: 'reduce',
          fromState: 'colon',
          toState: 'OPTIONS',
          countArgs: 5,
          func: createOptionsPositionAndEmotion,
        },
      ],
    },
    {
      stateName: 'load_scene',
      items: [{ type: 'shift', fromState: 'path', toState: 'path1' }],
    },
  ],
  goto: [
    //TODO: change type name by GoToBlock
    {
      stateName: 'DOWN',
      items: [
        { newState: 'MAIN', nameState: 'MAIN' },
        { newState: 'LOADLIST', nameState: 'LOADLIST' },
        { newState: 'LOAD', nameState: 'LOAD1' },
      ],
    },
    {
      stateName: 'LOADLIST',
      items: [
        { newState: 'ACTIONLIST', nameState: 'ACTIONLIST' },
        { newState: 'ACTION', nameState: 'ACTION1' },
        { newState: 'LOAD', nameState: 'LOAD2' },
        { newState: 'SET', nameState: 'SET' },
        { newState: 'PLAY', nameState: 'PLAY' },
        { newState: 'PHR', nameState: 'PHR' },
        { newState: 'PHRWE', nameState: 'PHRWE' },
        { newState: 'CHOICE', nameState: 'CHOICE' },
        { newState: 'VARLE', nameState: 'VARLE' },
        { newState: 'JUMP', nameState: 'JUMP1' },
        { newState: 'MARK', nameState: 'MARK' },
        { newState: 'LOADSCENE', nameState: 'LOADSCENE' },
      ],
    },
    {
      stateName: 'ACTIONLIST',
      items: [
        { newState: 'ACTION', nameState: 'ACTION3' },
        { newState: 'SET', nameState: 'SET' },
        { newState: 'PLAY', nameState: 'PLAY' },
        { newState: 'PHR', nameState: 'PHR' },
        { newState: 'PHRWE', nameState: 'PHRWE' },
        { newState: 'CHOICE', nameState: 'CHOICE' },
        { newState: 'VARLE', nameState: 'VARLE' },
        { newState: 'JUMP', nameState: 'JUMP1' },
        { newState: 'MARK', nameState: 'MARK' },
        { newState: 'LOADSCENE', nameState: 'LOADSCENE' },
      ],
    },
    { stateName: 'LOAD1', items: [{ newState: 'LOAD', nameState: 'LOAD3' }] },
    {
      stateName: 'ACTION1',
      items: [
        { newState: 'ACTION', nameState: 'ACTION2' },
        { newState: 'SET', nameState: 'SET' },
        { newState: 'PLAY', nameState: 'PLAY' },
        { newState: 'PHR', nameState: 'PHR' },
        { newState: 'PHRWE', nameState: 'PHRWE' },
        { newState: 'CHOICE', nameState: 'CHOICE' },
        { newState: 'VARLE', nameState: 'VARLE' },
        { newState: 'JUMP', nameState: 'JUMP1' },
        { newState: 'MARK', nameState: 'MARK' },
        { newState: 'LOADSCENE', nameState: 'LOADSCENE' },
      ],
    },
    { stateName: 'PHR', items: [{ newState: 'VARS', nameState: 'VARS' }] },
    { stateName: 'PHRWE', items: [{ newState: 'VARS', nameState: 'VARS' }] },
    { stateName: 'COND1', items: [{ newState: 'JUMP', nameState: 'JUMP2' }] },
    { stateName: 'load', items: [{ newState: 'WHLOAD', nameState: 'WHLOAD' }] },
    {
      stateName: ':3',
      items: [
        { newState: 'EFF', nameState: 'EFF1' },
        { newState: 'EFFLIST', nameState: 'EFFLIST' },
      ],
    },
    {
      stateName: 'label1',
      items: [{ newState: 'OPTIONS', nameState: 'OPTIONS' }],
    },
    { stateName: 'set', items: [{ newState: 'WHSET', nameState: 'WHSET' }] },
    { stateName: 'play', items: [{ newState: 'WHPLAY', nameState: 'WHPLAY' }] },
    {
      stateName: '{',
      items: [
        { newState: 'VAR', nameState: 'VAR1' },
        { newState: 'VARLIST', nameState: 'VARLIST' },
      ],
    },
    { stateName: ';', items: [{ newState: 'VAR', nameState: 'VAR2' }] },
    { stateName: ',2', items: [{ newState: 'EFF', nameState: 'EFF2' }] },
    { stateName: 'if', items: [{ newState: 'COND', nameState: 'COND1' }] },
    { stateName: 'and', items: [{ newState: 'COND', nameState: 'COND2' }] },
    { stateName: 'or', items: [{ newState: 'COND', nameState: 'COND3' }] },
    { stateName: 'not', items: [{ newState: 'COND', nameState: 'COND4' }] },
  ],
}

export default sceneConfig
