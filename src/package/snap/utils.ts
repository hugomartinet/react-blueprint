import { nanoid } from 'nanoid'
import { Position } from '../geometry/types'
import { getDistanceBetweenPositions, getClosestPositionOnLine } from '../geometry/utils'
import { Line } from '../line/types'
import { getLineNodes } from '../line/utils'
import { Node } from '../node/types'
import { isLineSnap, isNodeSnap, LineSnap, NodeSnap, Snap } from './types'

export function calculateNodeSnaps(nodes: Node[]): NodeSnap[] {
  return nodes.map(node => ({ id: nanoid(), priority: 2, distance: 10, isActive: false, position: node.position }))
}

export function calculateLineSnaps(lines: Line[], nodes: Node[]): LineSnap[] {
  return lines.map(line => {
    const [node0, node1] = getLineNodes(line, nodes)
    const [x0, y0, x1, y1] = [node0.position.x, node0.position.y, node1.position.x, node1.position.y]
    const a = y1 - y0
    const b = -(x1 - x0)
    const c = (x1 - x0) * y0 - (y1 - y0) * x0
    return { id: nanoid(), priority: 1, distance: 10, isActive: false, coefficients: { a, b, c } }
  })
}

export function getSnapClosestPosition(position: Position, snap: Snap): Position | undefined {
  if (isNodeSnap(snap)) return snap.position
  if (isLineSnap(snap)) return getClosestPositionOnLine(position, snap.coefficients)
}

export function activateSnaps(position: Position, snaps: Snap[]): Snap[] {
  return snaps.map(snap => {
    const closestPosition = getSnapClosestPosition(position, snap)
    const isActive = !!closestPosition && getDistanceBetweenPositions(position, closestPosition) <= snap.distance
    return { ...snap, isActive }
  })
}

export function getPrioritySnap(snaps: Snap[]): Snap | undefined {
  return snaps
    .filter(snap => snap.isActive)
    .reduce<
      Snap | undefined
    >((priority, current) => (priority && priority.priority > current.priority ? priority : current), undefined)
}
