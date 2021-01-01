import { ActionType as AT } from '../gameObjects/action'
import { Variant } from '../gameObjects/actions/choice'
import Jump from '../gameObjects/actions/jump'
import Phrase, { Options } from '../gameObjects/actions/phrase'
import { PlayType as PT } from '../gameObjects/actions/play'
import { SetType as ST } from '../gameObjects/actions/set'
import { Condition } from '../gameObjects/actions/varle'

export type SetAction = { type: AT; setType: ST; payload?: string }
export type PlayAction = { type: AT; playType: PT; payload: string }
export type PhraseAction = {
  type: AT
  speaker: string
  text: string
  options?: Options
}
export type ChoiceAction = { type: AT; question: Phrase; variants: Variant[] }
export type VarleAction = { type: AT; condition: Condition; target: Jump }
export type JumpAction = { type: AT; markName: string }
export type MarkAction = { type: AT; markName: string }
export type LoadsceneAction = { type: AT; pathScene: string }

export type CharacterLinkType = { name: string; label: string }
export type FileType = { type: string; path: string; name: string }
export type ActionType =
  | SetAction
  | PlayAction
  | PhraseAction
  | ChoiceAction
  | VarleAction
  | JumpAction
  | MarkAction
  | LoadsceneAction

export type LoadItem = CharacterLinkType | FileType | null
export type Scene = {
  chars: CharacterLinkType[]
  files: FileType[]
  actions: ActionType[]
}
