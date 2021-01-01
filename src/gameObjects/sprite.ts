export default class Sprite {
  constructor(readonly field: string, readonly path: string) {
    this.field = this.field.substring(1)
  }
}
