import Sprite from './sprite'

export default class Character {
  readonly sprites?: Map<string, Sprite>

  constructor(readonly name: string, sprites?: Sprite[]) {
    if (sprites) {
      this.sprites = this.buildSpriteMap(sprites)
    }
  }

  private buildSpriteMap = (sprites: Sprite[]): Map<string, Sprite> => {
    const spriteMap = new Map<string, Sprite>()
    sprites.forEach(sprite => spriteMap.set(sprite.field, sprite))
    return spriteMap
  }
}
