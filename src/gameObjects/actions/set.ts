import Action, { ActionType } from '../action'

export enum SetType {
  Background,
  Text,
  Blackout,
}

export default class Set extends Action {
  constructor(readonly setType: SetType, readonly payload?: string) {
    super(ActionType.Set)
  }
}
