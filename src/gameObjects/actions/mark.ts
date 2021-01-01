import Action, { ActionType } from '../action'

export default class Mark extends Action {
  constructor(readonly markName: string) {
    super(ActionType.Mark)
  }
}
