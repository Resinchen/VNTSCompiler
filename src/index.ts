import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'
import LRParser from 'lrparser-vnts'
import Builder from './builder'
import characterConfig from './configs/characterConfig'
import sceneConfig from './configs/sceneConfig'

export default class VNTSCompiler {
  private static parsers: Map<string, LRParser> = new Map([
    [
      'character',
      new LRParser(
        characterConfig.patterns,
        characterConfig.action,
        characterConfig.goto
      ),
    ],
    [
      'scene',
      new LRParser(sceneConfig.patterns, sceneConfig.action, sceneConfig.goto),
    ],
  ])

  public static compileFile(type: 'character' | 'scene', text: string) {
    return this.parsers.get(type)?.parse(text)
  }

  private static extractFileInfo(filepath: string) {
    return {
      path: filepath,
      filename: basename(filepath, '.txt'),
    }
  }

  private static getFilesInfo(scriptFolder: string) {
    const files = readdirSync(scriptFolder).map(file =>
      join(scriptFolder, file)
    )

    const charFilepath = files.filter(
      file => basename(file, '.txt') === 'chars'
    )[0]
    const sceneFilepaths = files.filter(file => file !== charFilepath)

    const charFile = VNTSCompiler.extractFileInfo(charFilepath)
    const sceneFiles = sceneFilepaths.map(VNTSCompiler.extractFileInfo)

    return { charFile, sceneFiles }
  }

  private static readFileAndCompile(
    filepath: string,
    type: 'character' | 'scene'
  ) {
    const fileText = readFileSync(filepath, 'utf-8')
    return VNTSCompiler.compileFile(type, fileText)
  }

  private static compileCharacterFile(filepath: string, outputPath: string) {
    const res = VNTSCompiler.readFileAndCompile(filepath, 'character')
    writeFileSync(outputPath, JSON.stringify(res))
  }

  private static compileSceneFile(filepath: string, outputPath: string) {
    const res = VNTSCompiler.readFileAndCompile(filepath, 'scene')
    const buildedScene = Builder.build(res)
    writeFileSync(outputPath, JSON.stringify(buildedScene))
  }

  public static build(gamePath: string) {
    const scriptFolder = join(gamePath, 'script/')
    const compiledFolder = join(gamePath, 'compiled/')

    const { charFile, sceneFiles } = this.getFilesInfo(scriptFolder)

    VNTSCompiler.compileCharacterFile(
      charFile.path,
      join(compiledFolder, `${charFile.filename}.json`)
    )

    sceneFiles.forEach(file => {
      VNTSCompiler.compileSceneFile(
        file.path,
        join(compiledFolder, `${file.filename}.json`)
      )
    })
  }
}
