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
