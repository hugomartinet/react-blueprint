import { getDistanceBetweenPositions } from '../geometry/distance'
import { Position } from '../geometry/types'
import { Node } from './types'

export function getCloseByNode(position: Position, nodes: Node[]): Node | undefined {
  return nodes.find(otherNode => getDistanceBetweenPositions(position, otherNode.position) <= 5)
}
