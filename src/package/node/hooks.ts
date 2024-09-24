import { useCallback } from 'react'
import { Position } from '../geometry/types'
import { useMonitorStore } from '../monitor/store'
import { useSnapStore } from '../snap/store'
import { findClosestSnapPosition } from '../snap/utils'
import { useNodeStore } from './store'

export function useUpdateNodePositions() {
  const updateNode = useNodeStore(state => state.updateNode)
  const selectedNodeIds = useMonitorStore(state => state.selectedNodeIds)

  const snaps = useSnapStore(state => state.snaps)

  return useCallback(
    (position: Position) => {
      selectedNodeIds.forEach(nodeId => {
        const closestSnapPosition = findClosestSnapPosition(position, snaps)
        updateNode(nodeId, closestSnapPosition ?? position)
      })
    },
    [selectedNodeIds, updateNode, snaps],
  )
}
