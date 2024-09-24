import { Line } from '../line/types'
import { Node } from '../node/types'

export type Scene = {
  width: number
  height: number
  nodes: Node[]
  lines: Line[]
}
