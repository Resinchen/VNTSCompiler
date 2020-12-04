import { Config } from '../@types/config'
import CharacterLink from '../gameObjects/characterLink'

const sceneConfig: Config = {
  patterns: [
    { regex: /^[ \n\t]+/, tag: 'None', hasLexVal: false },
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
    { regex: /^mark[^_]/, tag: 'mark', hasLexVal: false },
    { regex: /^if/, tag: 'if', hasLexVal: false },
    { regex: /^is/, tag: 'is', hasLexVal: false },
    { regex: /^:/, tag: 'colon', hasLexVal: false },
    { regex: /^{/, tag: 'curly_brackets_open', hasLexVal: false },
    { regex: /^}/, tag: 'curly_brackets_close', hasLexVal: false },
    { regex: /^;/, tag: 'semicolon', hasLexVal: false },
    { regex: /^,/, tag: 'comma', hasLexVal: false },
    { regex: /^=/, tag: 'equals', hasLexVal: false },
    { regex: /^([0-9]|[1-9][0-9]+)/, tag: 'digit', hasLexVal: true },
    { regex: /^\([\w]+\)/, tag: 'emotion', hasLexVal: true },
    { regex: /^(-|\+)/, tag: 'digit_op', hasLexVal: true },
    { regex: /^(true|false)/, tag: 'bool', hasLexVal: true },
    { regex: /^[<|>]=?/, tag: 'bool_op', hasLexVal: true },
    { regex: /^mark_[_\w]+/, tag: 'mark_name', hasLexVal: true },
    { regex: /^counter_[_\w]+/, tag: 'counter_name', hasLexVal: true },
    { regex: /^flag_[_\w]+/, tag: 'flag_name', hasLexVal: true },
    { regex: /^#[ \.#\,\-\!\?\w\d]*#/, tag: 'comment', hasLexVal: true },
    { regex: /^\"\w[\w\d\./\\]+\"/, tag: 'path', hasLexVal: true },
    { regex: /^\"[ \.\,\-\!\?\w\d{}<>/`]*\"/, tag: 'words', hasLexVal: true },
    { regex: /^\w[_\w]+/, tag: 'name', hasLexVal: true },
    { regex: /^\w/, tag: 'label', hasLexVal: true },
  ],
  action: [
    {
      stateName: 'DOWN',
      items: [
        { type: 'shift', fromState: 'load', toState: 'load' },
        { type: 'shift', fromState: 'comment', toState: 'comment' },
      ],
    },
    {
      stateName: 'MAIN',
      items: [{ type: 'finish', fromState: 'eof', toState: 'ok' }],
    },
    {
      stateName: 'LOADLIST1',
      items: [
        { type: 'shift', fromState: 'load', toState: 'load' },
        { type: 'shift', fromState: 'label', toState: 'label1' },
        { type: 'shift', fromState: 'set', toState: 'set' },
        { type: 'shift', fromState: 'play', toState: 'play' },
        { type: 'shift', fromState: 'comment', toState: 'comment' },
        { type: 'shift', fromState: 'if', toState: 'if' },
        { type: 'shift', fromState: 'jump', toState: 'jump' },
        { type: 'shift', fromState: 'mark', toState: 'mark' },
        { type: 'shift', fromState: 'load_scene', toState: 'load_scene' },
      ],
    },
    {
      stateName: 'LOADLIST2',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (C, LL) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
      ],
    },
    {
      stateName: 'ACTIONLIST',
      items: [
        { type: 'shift', fromState: 'label', toState: 'label1' },
        { type: 'shift', fromState: 'set', toState: 'set' },
        { type: 'shift', fromState: 'play', toState: 'play' },
        { type: 'shift', fromState: 'comment', toState: 'comment' },
        { type: 'shift', fromState: 'if', toState: 'if' },
        { type: 'shift', fromState: 'jump', toState: 'jump' },
        { type: 'shift', fromState: 'mark', toState: 'mark' },
        { type: 'shift', fromState: 'load_scene', toState: 'load_scene' },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'MAIN',
          countArgs: 2,
          func: (LL, AL) =>
            new Map([
              [
                'res',
                {
                  chars: LL.attr.get('chars'),
                  files: LL.attr.get('files'),
                  actions: AL.attr.get('list'),
                },
              ],
            ]),
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
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
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
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (L1, L2) =>
            new Map([
              ['chars', [L1.attr.get('char'), L2.attr.get('char')]],
              ['files', [L1.attr.get('file'), L2.attr.get('file')]],
            ]),
        },
      ],
    },
    {
      stateName: 'LOAD4',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, L) =>
            new Map([
              ['chars', [...LL.attr.get('chars'), L.attr.get('char')]],
              ['files', [...LL.attr.get('files'), L.attr.get('file')]],
            ]),
        },
      ],
    },
    {
      stateName: 'COM1',
      items: [
        { type: 'shift', fromState: 'load', toState: 'load' },
        { type: 'shift', fromState: 'comment', toState: 'comment' },
      ],
    },
    {
      stateName: 'COM2',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADLIST',
          countArgs: 2,
          func: (LL, C) =>
            new Map([
              ['chars', LL.attr.get('chars')],
              ['files', LL.attr.get('files')],
            ]),
        },
      ],
    },
    {
      stateName: 'COM3',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, C) => new Map([['list', AL.attr.get('list')]]),
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
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (AL, A) =>
            new Map([['list', [...AL.attr.get('list'), A.attr.get('action')]]]),
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
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTIONLIST',
          countArgs: 2,
          func: (A1, A2) =>
            new Map([['list', [A1.attr.get('action'), A2.attr.get('action')]]]),
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
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: S => new Map([['action', S.attr.get('set')]]),
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
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('play')]]),
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
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        { type: 'shift', fromState: 'curly_brackets_open', toState: '{' },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
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
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: P => new Map([['action', P.attr.get('phrase')]]),
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
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: C => new Map([['action', C.attr.get('choice')]]),
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
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: V => new Map([['action', V.attr.get('varle')]]),
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
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: J => new Map([['action', J.attr.get('jump')]]),
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
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'VARLE',
          countArgs: 3,
          func: (i, C, J) =>
            new Map([
              [
                'varle',
                { condition: C.attr.get('value'), target: J.attr.get('jump') },
              ],
            ]),
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
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: M => new Map([['action', M.attr.get('mark')]]),
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
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'ACTION',
          countArgs: 1,
          func: L => new Map([['action', L.attr.get('next_scene')]]),
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
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOAD',
          countArgs: 2,
          func: (l, W) =>
            new Map([
              ['char', W.attr.get('char')],
              ['file', W.attr.get('file')],
            ]),
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
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'SET',
          countArgs: 2,
          func: (s, W) =>
            new Map([
              [
                'set',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
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
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'PLAY',
          countArgs: 2,
          func: (p, W) =>
            new Map([
              [
                'play',
                { type: W.attr.get('type'), payload: W.attr.get('info') },
              ],
            ]),
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
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'CHOICE',
          countArgs: 2,
          func: (P, V) =>
            new Map([
              [
                'choice',
                {
                  question: P.attr.get('phrase'),
                  variants: V.attr.get('list'),
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'VAR1',
      items: [{ type: 'shift', fromState: 'semicolon', toState: ';' }],
    },
    {
      stateName: 'VAR2',
      items: [
        { type: 'shift', fromState: 'curly_brackets_close', toState: '}' },
      ],
    },
    {
      stateName: 'EFF1',
      items: [
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'VAR',
          countArgs: 3,
          func: (w, s, E) =>
            new Map([
              [
                'variant',
                { value: w.attr.get('val'), effect: E.attr.get('effect') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'VAR',
          countArgs: 3,
          func: (w, s, E) =>
            new Map([
              [
                'variant',
                { value: w.attr.get('val'), effect: E.attr.get('effect') },
              ],
            ]),
        },
        { type: 'shift', fromState: 'comma', toState: ',' },
      ],
    },
    {
      stateName: 'EFF2',
      items: [
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'EFFLIST',
          countArgs: 3,
          func: (E1, c, E2) =>
            new Map([['list', [E1.attr.get('effect'), E2.attr.get('effect')]]]),
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'EFFLIST',
          countArgs: 3,
          func: (E1, c, E2) =>
            new Map([['list', [E1.attr.get('effect'), E2.attr.get('effect')]]]),
        },
      ],
    },
    {
      stateName: 'EFFLIST',
      items: [
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'VAR',
          countArgs: 3,
          func: (w, s, EL) =>
            new Map([
              [
                'variant',
                { text: w.attr.get('val'), effects: EL.attr.get('list') },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'VAR',
          countArgs: 3,
          func: (w, s, EL) =>
            new Map([
              [
                'variant',
                { text: w.attr.get('val'), effects: EL.attr.get('list') },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'COND',
      items: [{ type: 'shift', fromState: 'jump', toState: 'jump' }],
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
      items: [{ type: 'shift', fromState: 'name', toState: 'name1' }],
    },
    {
      stateName: 'name1',
      items: [{ type: 'shift', fromState: 'colon', toState: ':3' }],
    },
    {
      stateName: 'name2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHSET',
          countArgs: 2,
          func: (b, n) =>
            new Map([
              ['type', 'background'],
              ['info', n.attr.get('val')],
            ]),
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
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHPLAY',
          countArgs: 2,
          func: (s, n) =>
            new Map([
              ['type', 'sound'],
              ['info', n.attr.get('val')],
            ]),
        },
      ],
    },
    {
      stateName: ':1',
      items: [{ type: 'shift', fromState: 'words', toState: 'words3' }],
    },
    {
      stateName: ':2',
      items: [{ type: 'shift', fromState: 'words', toState: 'words4' }],
    },
    {
      stateName: ':3',
      items: [{ type: 'shift', fromState: 'label', toState: 'label2' }],
    },
    {
      stateName: ':4',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name2' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name2' },
      ],
    },
    {
      stateName: 'label1',
      items: [
        { type: 'shift', fromState: 'colon', toState: ':1' },
        { type: 'shift', fromState: 'emotion', toState: 'emotion' },
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
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHLOAD',
          countArgs: 4,
          func: (c, n, s, l) =>
            new Map([
              ['char', new CharacterLink(n.attr.get('val'), l.attr.get('val'))],
            ]),
        },
      ],
    },
    {
      stateName: 'image',
      items: [{ type: 'shift', fromState: 'path', toState: 'path3' }],
    },
    {
      stateName: 'path1',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'LOADSCENE',
          countArgs: 2,
          func: (l, p) => new Map([['path', p.attr.get('val')]]),
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
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'sound', payload: p.attr.get('val') }]]),
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
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHLOAD',
          countArgs: 2,
          func: (s, p) =>
            new Map([['file', { type: 'image', payload: p.attr.get('val') }]]),
        },
      ],
    },
    {
      stateName: 'sound1',
      items: [{ type: 'shift', fromState: 'path', toState: 'path2' }],
    },
    {
      stateName: 'sound2',
      items: [{ type: 'shift', fromState: 'name', toState: 'name3' }],
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
      items: [{ type: 'shift', fromState: 'name', toState: 'name2' }],
    },
    {
      stateName: 'text',
      items: [{ type: 'shift', fromState: 'words', toState: 'words2' }],
    },
    {
      stateName: 'words1',
      items: [{ type: 'shift', fromState: 'colon', toState: ':4' }],
    },
    {
      stateName: 'words2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHSET',
          countArgs: 2,
          func: (t, w) =>
            new Map([
              ['type', 'text'],
              ['info', w.attr.get('val')],
            ]),
        },
      ],
    },
    {
      stateName: 'words3',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'PHRWE',
          countArgs: 3,
          func: (l, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: null,
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'words4',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_open',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'PHR',
          countArgs: 4,
          func: (l, e, s, w) =>
            new Map([
              [
                'phrase',
                {
                  label: l.attr.get('val'),
                  emotion: e.attr.get('val'),
                  words: w.attr.get('val'),
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'blackout',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'WHSET',
          countArgs: 1,
          func: b =>
            new Map([
              ['type', 'blackout'],
              ['info', null],
            ]),
        },
      ],
    },
    {
      stateName: 'play',
      items: [{ type: 'shift', fromState: 'sound', toState: 'sound2' }],
    },
    {
      stateName: 'comment',
      items: [
        {
          type: 'reduce',
          fromState: 'load',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'image',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'path',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'COM',
          countArgs: 1,
          func: () => new Map(),
        },
      ],
    },
    {
      stateName: 'emotion',
      items: [{ type: 'shift', fromState: 'colon', toState: ':2' }],
    },
    {
      stateName: '{',
      items: [{ type: 'shift', fromState: 'words', toState: 'words1' }],
    },
    {
      stateName: ';',
      items: [{ type: 'shift', fromState: 'words', toState: 'words1' }],
    },
    {
      stateName: '}',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'VARS',
          countArgs: 5,
          func: (op, V1, s, V2, cl) =>
            new Map([
              ['list', [V1.attr.get('variant'), V2.attr.get('variant')]],
            ]),
        },
      ],
    },
    {
      stateName: 'flag_name1',
      items: [{ type: 'shift', fromState: 'is', toState: 'is' }],
    },
    {
      stateName: 'flag_name2',
      items: [{ type: 'shift', fromState: 'equals', toState: '=' }],
    },
    {
      stateName: '=',
      items: [{ type: 'shift', fromState: 'bool', toState: 'bool2' }],
    },
    {
      stateName: 'bool1',
      items: [
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COND',
          countArgs: 3,
          func: (f, i, b) =>
            new Map([
              ['value', { flag: f.attr.get('val'), bool: b.attr.get('val') }],
            ]),
        },
      ],
    },
    {
      stateName: 'bool2',
      items: [
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'EFF',
          countArgs: 3,
          func: (f, e, b) =>
            new Map([
              [
                'effect',
                {
                  name: 'set_flag',
                  value: [f.attr.get('val'), b.attr.get('val')],
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'EFF',
          countArgs: 3,
          func: (f, e, b) =>
            new Map([
              [
                'effect',
                {
                  name: 'set_flag',
                  value: [f.attr.get('val'), b.attr.get('val')],
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comma',
          toState: 'EFF',
          countArgs: 3,
          func: (f, e, b) =>
            new Map([
              [
                'effect',
                {
                  name: 'set_flag',
                  value: [f.attr.get('val'), b.attr.get('val')],
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'counter_name1',
      items: [{ type: 'shift', fromState: 'bool_op', toState: 'bool_op' }],
    },
    {
      stateName: 'counter_name2',
      items: [{ type: 'shift', fromState: 'digit_op', toState: 'digit_op' }],
    },
    {
      stateName: 'digit_op',
      items: [{ type: 'shift', fromState: 'digit', toState: 'digit2' }],
    },
    {
      stateName: 'digit1',
      items: [
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'COND',
          countArgs: 3,
          func: (cn, bo, d) =>
            new Map([
              [
                'value',
                {
                  counter: cn.attr.get('val'),
                  op: bo.attr.get('val'),
                  digit: d.attr.get('val'),
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'digit2',
      items: [
        {
          type: 'reduce',
          fromState: 'semicolon',
          toState: 'EFF',
          countArgs: 3,
          func: (cn, op, d) =>
            new Map([
              [
                'effect',
                {
                  name: 'change_counter',
                  value: [
                    cn.attr.get('val'),
                    op.attr.get('val'),
                    d.attr.get('val'),
                  ],
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'curly_brackets_close',
          toState: 'EFF',
          countArgs: 3,
          func: (cn, op, d) =>
            new Map([
              [
                'effect',
                {
                  name: 'change_counter',
                  value: [
                    cn.attr.get('val'),
                    op.attr.get('val'),
                    d.attr.get('val'),
                  ],
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comma',
          toState: 'EFF',
          countArgs: 3,
          func: (cn, op, d) =>
            new Map([
              [
                'effect',
                {
                  name: 'change_counter',
                  value: [
                    cn.attr.get('val'),
                    op.attr.get('val'),
                    d.attr.get('val'),
                  ],
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: ',',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name2' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name2' },
      ],
    },
    {
      stateName: 'if',
      items: [
        { type: 'shift', fromState: 'flag_name', toState: 'flag_name1' },
        { type: 'shift', fromState: 'counter_name', toState: 'counter_name1' },
      ],
    },
    {
      stateName: 'is',
      items: [{ type: 'shift', fromState: 'bool', toState: 'bool1' }],
    },
    {
      stateName: 'bool_op',
      items: [{ type: 'shift', fromState: 'digit', toState: 'digit1' }],
    },
    {
      stateName: 'jump',
      items: [{ type: 'shift', fromState: 'mark_name', toState: 'mark_name1' }],
    },
    {
      stateName: 'mark_name1',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'JUMP',
          countArgs: 2,
          func: (j, mn) =>
            new Map([
              [
                'jump',
                {
                  name: 'make_jump',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'mark_name2',
      items: [
        {
          type: 'reduce',
          fromState: 'label',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'set',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'play',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'comment',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'if',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'jump',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'mark',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'load_scene',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
        {
          type: 'reduce',
          fromState: 'eof',
          toState: 'MARK',
          countArgs: 2,
          func: (m, mn) =>
            new Map([
              [
                'mark',
                {
                  name: 'create_mark',
                  payload: { mark_name: mn.attr.get('val') },
                },
              ],
            ]),
        },
      ],
    },
    {
      stateName: 'mark',
      items: [{ type: 'shift', fromState: 'mark_name', toState: 'mark_name2' }],
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
        { newState: 'LOADLIST', nameState: 'LOADLIST1' },
        { newState: 'LOAD', nameState: 'LOAD1' },
        { newState: 'COM', nameState: 'COM1' },
      ],
    },
    {
      stateName: 'LOADLIST1',
      items: [
        { newState: 'ACTIONLIST', nameState: 'ACTIONLIST' },
        { newState: 'ACTION', nameState: 'ACTION1' },
        { newState: 'LOAD', nameState: 'LOAD2' },
        { newState: 'SET', nameState: 'SET' },
        { newState: 'PLAY', nameState: 'PLAY' },
        { newState: 'COM', nameState: 'COM2' },
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
      stateName: 'LOADLIST2',
      items: [
        { newState: 'LOAD', nameState: 'LOAD4' },
        { newState: 'COM', nameState: 'COM2' },
      ],
    },
    {
      stateName: 'ACTIONLIST',
      items: [
        { newState: 'ACTION', nameState: 'ACTION2' },
        { newState: 'SET', nameState: 'SET' },
        { newState: 'PLAY', nameState: 'PLAY' },
        { newState: 'COM', nameState: 'COM3' },
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
    { stateName: 'LOAD4', items: [{ newState: 'LOAD', nameState: 'LOAD1' }] },
    {
      stateName: 'COM1',
      items: [
        { newState: 'LOADLIST', nameState: 'LOADLIST2' },
        { newState: 'LOAD', nameState: 'LOAD1' },
        { newState: 'COM', nameState: 'COM1' },
      ],
    },
    {
      stateName: 'ACTION1',
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
    { stateName: 'PHR', items: [{ newState: 'VARS', nameState: 'VARS' }] },
    { stateName: 'COND', items: [{ newState: 'JUMP', nameState: 'JUMP2' }] },
    { stateName: 'load', items: [{ newState: 'WHLOAD', nameState: 'WHLOAD' }] },
    {
      stateName: ':4',
      items: [
        { newState: 'EFF', nameState: 'EFF1' },
        { newState: 'EFFLIST', nameState: 'EFFLIST' },
      ],
    },
    { stateName: 'set', items: [{ newState: 'WHSET', nameState: 'WHSET' }] },
    { stateName: 'play', items: [{ newState: 'WHPLAY', nameState: 'WHPLAY' }] },
    { stateName: '{', items: [{ newState: 'VAR', nameState: 'VAR1' }] },
    { stateName: ';', items: [{ newState: 'VAR', nameState: 'VAR2' }] },
    { stateName: ',', items: [{ newState: 'EFF', nameState: 'EFF2' }] },
    { stateName: 'if', items: [{ newState: 'COND', nameState: 'COND' }] },
  ],
}

export default sceneConfig
