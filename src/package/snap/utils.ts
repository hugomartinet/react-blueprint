import { getDistanceBetweenPositions, getClosestPositionOnLine } from '../geometry/distance'
import { Position } from '../geometry/types'
import { Node } from '../node/types'
import { isLineSnap, isNodeSnap, NodeSnap, Snap } from './types'

export function calculateNodeSnaps(nodes: Node[]): NodeSnap[] {
  return nodes.map(node => ({ priority: 1, position: node.position, radius: 10 }))
}

export function getCloseByPosition(position: Position, snap: Snap): Position | undefined {
  if (isNodeSnap(snap)) {
    if (getDistanceBetweenPositions(position, snap.position) <= snap.radius) return snap.position
  }
  if (isLineSnap(snap)) {
    const closestPosition = getClosestPositionOnLine(position, snap.coefficients)
    if (getDistanceBetweenPositions(position, closestPosition) <= snap.distance) return closestPosition
  }
}

export function findClosestSnapPosition(position: Position, snaps: Snap[]): Position | undefined {
  let closestSnap: Snap | undefined
  let closestSnapPosition: Position | undefined
  for (const snap of snaps) {
    const closeByPosition = getCloseByPosition(position, snap)
    if (closeByPosition) {
      if (!closestSnap || snap.priority > closestSnap.priority || snap.priority) {
        closestSnap = snap
        closestSnapPosition = closeByPosition
      }
    }
  }
  return closestSnapPosition
}
