export default class Sprite {
  constructor(readonly field: string, readonly path: string) {
    this.path = path.replace(/\"/g, '')
  }
}
