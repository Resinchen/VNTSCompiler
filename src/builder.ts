import { CharacterLinkType, FileType, LoadItem, Scene } from './@types/builder'
import { ActionType } from './gameObjects/action'
import Play from './gameObjects/actions/play'
import Set from './gameObjects/actions/set'

export default class Builder {
  private static loadFilter = <T extends LoadItem>(loads: LoadItem[]): T[] =>
    loads.filter(item => !!item).map(item => item as T)

  private static getLoadFiles(files: FileType[]): Map<string, string> {
    const result = new Map([['', '']])
    files.forEach(file => result.set(file.name, file.path))

    return result
  }

  public static build(parsedResult: Scene): Scene {
    const { chars, files, actions } = parsedResult

    // Filtering all null values from LoadList
    const filteredChars = Builder.loadFilter<CharacterLinkType>(chars)
    const filteredFiles = Builder.loadFilter<FileType>(files)

    // Change path-label in setter and player to real path
    const loadFiles = Builder.getLoadFiles(filteredFiles)

    actions.forEach(action => {
      if (action.type === ActionType.Set) {
        ;(action as Set).payload = loadFiles.get((action as Set).payload || '')
      }
      if (action.type === ActionType.Play) {
        ;(action as Play).payload = loadFiles.get((action as Play).payload)!
      }
    })

    return {
      chars: filteredChars,
      files: filteredFiles,
      actions: actions,
    }
  }
}
