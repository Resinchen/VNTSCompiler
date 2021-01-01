import { CharacterLinkType, FileType, LoadItem, Scene } from './@types/builder'

export default class Builder {
  private static loadFilter = <T extends LoadItem>(loads: LoadItem[]): T[] =>
    loads.filter(item => !!item).map(item => item as T)

  public static build(parsedResult: Scene): Scene {
    const { chars, files, actions } = parsedResult

    // Filtering all null values from LoadList
    const filteredChars = Builder.loadFilter<CharacterLinkType>(chars)
    const filteredFiles = Builder.loadFilter<FileType>(files)

    return {
      chars: filteredChars,
      files: filteredFiles,
      actions: actions,
    }
  }
}
