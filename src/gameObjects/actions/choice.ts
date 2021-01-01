import Action, { ActionType } from '../action'
import Phrase from './phrase'

export default class Choice extends Action {
  constructor(readonly question: Phrase, readonly variants: Variant[]) {
    super(ActionType.Choice)
  }
}

export class Variant {
  constructor(readonly text: string, readonly effects: Effect[]) {}
}

export class Effect {
  constructor(
    readonly typeEffect: string,
    readonly target: string,
    readonly value: string,
    readonly op?: string
  ) {}
}
