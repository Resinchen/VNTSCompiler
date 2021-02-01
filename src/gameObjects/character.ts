import Sprite from './sprite'

export default class Character {
  constructor(readonly name: string, readonly sprites?: Sprite[]) {}
}
