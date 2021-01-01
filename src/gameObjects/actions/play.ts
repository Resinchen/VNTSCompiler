import Action, { ActionType } from '../action'

export enum PlayType {
  Sound,
}

export default class Play extends Action {
  constructor(readonly playType: PlayType, readonly payload: string) {
    super(ActionType.Play)
  }
}
