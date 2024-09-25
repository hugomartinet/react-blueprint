import { useCallback } from 'react'
import { Position } from '../geometry/types'
import { useMonitorStore } from '../monitor/store'
import { useSnapStore } from '../snap/store'
import { getActiveSnaps, getClosestPosition, getPrioritySnap } from '../snap/utils'
import { useNodeStore } from './store'

export function useUpdateNodePositions() {
  const updateNode = useNodeStore(state => state.updateNode)
  const selectedNodeIds = useMonitorStore(state => state.selectedNodeIds)

  const snaps = useSnapStore(state => state.snaps)
  const setActiveSnaps = useSnapStore(state => state.setActiveSnaps)

  return useCallback(
    (position: Position) => {
      selectedNodeIds.forEach(nodeId => {
        const activeSnaps = getActiveSnaps(position, snaps)
        setActiveSnaps(activeSnaps)
        const prioritySnap = getPrioritySnap(activeSnaps)
        const prioriySnapPosition = prioritySnap && getClosestPosition(position, prioritySnap)
        updateNode(nodeId, prioriySnapPosition ?? position)
      })
    },
    [selectedNodeIds, updateNode, snaps, setActiveSnaps],
  )
}
