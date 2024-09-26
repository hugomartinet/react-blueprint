import { Node } from '../node/types'
import { Line } from './types'

export function getLineNodes(line: Line, nodes: Node[]): [Node, Node] {
  const node0 = nodes.find(node => node.id === line.nodeIds[0])
  if (!node0) throw new Error(`Node ${line.nodeIds[0]} not found`)
  const node1 = nodes.find(node => node.id === line.nodeIds[1])
  if (!node1) throw new Error(`Node ${line.nodeIds[1]} not found`)
  return [node0, node1]
}

export function replaceNodeIdInLines(lines: Line[], oldNodeId: string, newNodeId: string): Line[] {
  return lines.map(line => ({
    ...line,
    nodeIds: [
      line.nodeIds[0] === oldNodeId ? newNodeId : line.nodeIds[0],
      line.nodeIds[1] === oldNodeId ? newNodeId : line.nodeIds[1],
    ],
  }))
}
