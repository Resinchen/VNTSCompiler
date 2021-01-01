import Action, { ActionType } from '../action'

export default class Jump extends Action {
  constructor(readonly markName: string) {
    super(ActionType.Jump)
  }
}
