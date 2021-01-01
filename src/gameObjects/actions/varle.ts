import Action, { ActionType } from '../action'
import Jump from './jump'

export default class Varle extends Action {
  constructor(readonly condition: Condition, readonly target: Jump) {
    super(ActionType.Varle)
  }
}

export class Condition {}

export class SimpleCondition extends Condition {
  constructor(
    readonly type: string,
    readonly target: string,
    readonly op: string,
    readonly value: string
  ) {
    super()
  }
}

export class CompositeCondition extends Condition {
  constructor(
    readonly leftOperand: Condition | undefined,
    readonly op: string,
    readonly rightOperand: Condition
  ) {
    super()
  }
}
