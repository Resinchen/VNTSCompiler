import { basename, extname } from 'path'

export default class File {
  name: string

  constructor(readonly type: 'image' | 'sound', readonly path: string) {
    this.name = basename(path, extname(path))
  }
}
