import Action, { ActionType } from '../action'

export enum SetType {
  Background,
  Text,
  Blackout,
}

export default class Set extends Action {
  public payload?: string
  constructor(readonly setType: SetType, whatSet?: string) {
    super(ActionType.Set)
    this.payload = whatSet
  }
}
