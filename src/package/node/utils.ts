import { Position } from '../geometry/types'
import { getDistanceBetweenPositions } from '../geometry/utils'
import { Node } from './types'

export function getCloseByNode(position: Position, nodes: Node[]): Node | undefined {
  return nodes.find(otherNode => getDistanceBetweenPositions(position, otherNode.position) <= 5)
}
