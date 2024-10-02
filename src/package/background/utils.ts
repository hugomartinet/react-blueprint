import { Position } from '../geometry/types'
import { getEventPosition } from '../mouse-events/utils'
import { initNode } from '../node/store'
import { AdjustingNodes } from './types'

export function createFirstAdjustingNode(position: Position): AdjustingNodes {
  return [initNode(position), null]
}

export function createSecondAdjustingNode(position: Position, adjustingNodes: AdjustingNodes): AdjustingNodes {
  return [adjustingNodes[0], initNode(position)]
}

export function calculateAdjustingNodesNewPosition(event: MouseEvent, adjustingNodes: AdjustingNodes): AdjustingNodes {
  if (adjustingNodes[1]) return [adjustingNodes[0], { ...adjustingNodes[1], position: getEventPosition(event) }]
  if (adjustingNodes[0]) return [{ ...adjustingNodes[0], position: getEventPosition(event) }, null]
  return [null, null]
}
