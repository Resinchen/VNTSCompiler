import Action, { ActionType } from '../action'
import Character from '../character'

export default class Phrase extends Action {
  public speaker: string | Character
  public options?: Options
  public text: string

  constructor(speaker: string | Character, text: string, options?: Options) {
    super(ActionType.Phrase)
    this.speaker = speaker
    this.options = options
    this.text = text
  }
}

export class Options {
  public position?: string
  public emotion?: string

  constructor(position?: string, emotion?: string) {
    this.position = position
    this.emotion = emotion
  }
}
