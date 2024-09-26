import { Line } from '../line/types'
import { Node } from '../node/types'

export type Scene = Dimensions & {
  nodes: Node[]
  lines: Line[]
}

export type Dimensions = {
  width: number
  height: number
}
