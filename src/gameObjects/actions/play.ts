import Action, { ActionType } from '../action'

export enum PlayType {
  Sound,
}

export default class Play extends Action {
  public payload: string

  constructor(readonly playType: PlayType, whatPlay: string) {
    super(ActionType.Play)
    this.payload = whatPlay
  }
}
