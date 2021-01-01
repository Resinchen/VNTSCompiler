import Action, { ActionType } from '../action'

export default class LoadScene extends Action {
  constructor(readonly pathScene: string) {
    super(ActionType.Loadscene)
  }
}
