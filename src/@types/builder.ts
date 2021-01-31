import Action from '../gameObjects/action'

export type CharacterLinkType = { name: string; label: string }
export type FileType = { type: string; path: string; name: string }

export type LoadItem = CharacterLinkType | FileType | null
export type Scene = {
  chars: CharacterLinkType[]
  files: FileType[]
  actions: Action[]
}
