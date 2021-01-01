export enum ActionType {
  Set,
  Play,
  Phrase,
  Choice,
  Varle,
  Jump,
  Mark,
  Loadscene,
}

export default class Action {
  constructor(protected type: ActionType) {}
}
