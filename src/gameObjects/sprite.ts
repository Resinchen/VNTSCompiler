export default class Sprite {
  constructor(
    readonly name: string,
    readonly field: string,
    readonly path: string
  ) {
    this.field = this.field.substring(1)
  }
}
