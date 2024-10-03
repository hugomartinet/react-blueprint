import { Position } from '../geometry/types'
import { getDistanceBetweenPositions } from '../geometry/utils'
import { Line } from '../line/types'
import { Node } from './types'

export function getCloseByNode(position: Position, nodes: Node[]): Node | undefined {
  return nodes.find(otherNode => getDistanceBetweenPositions(position, otherNode.position) <= 5)
}

export function getUnusedNodeIds(nodes: Node[], lines: Line[]): string[] {
  const nodeIds = nodes.map(node => node.id)
  return nodeIds.filter(nodeId => !lines.some(line => line.nodeIds.includes(nodeId)))
}
