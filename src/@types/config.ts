import State from 'lrparser-vnts/lib/utils/state'
import {
  ActionTableDesc,
  GotoTableDesc,
  Pattern,
} from '../../node_modules/lrparser-vnts/lib/utils/utils'

export type Config = {
  patterns: Pattern[]
  action: ActionTableDesc
  goto: GotoTableDesc
}

export type ReduceFunc = (...states: State[]) => Map<string, any>
