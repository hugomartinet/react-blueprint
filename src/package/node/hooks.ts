import { useCallback } from 'react'
import { Position } from '../geometry/types'
import { useLineStore } from '../line/store'
import { useMonitorStore } from '../monitor/store'
import { useSnapStore } from '../snap/store'
import { getActiveSnaps, getClosestPosition, getPrioritySnap } from '../snap/utils'
import { useNodeStore } from './store'
import { getCloseByNode } from './utils'

export function useUpdateNodePositions() {
  const updateNode = useNodeStore(state => state.updateNode)
  const selectedNodeId = useMonitorStore(state => state.selectedNodeId)

  const snaps = useSnapStore(state => state.snaps)
  const setActiveSnaps = useSnapStore(state => state.setActiveSnaps)

  return useCallback(
    (position: Position) => {
      if (selectedNodeId) {
        const activeSnaps = getActiveSnaps(position, snaps)
        setActiveSnaps(activeSnaps)
        const prioritySnap = getPrioritySnap(activeSnaps)
        const prioriySnapPosition = prioritySnap && getClosestPosition(position, prioritySnap)
        updateNode(selectedNodeId, prioriySnapPosition ?? position)
      }
    },
    [selectedNodeId, updateNode, snaps, setActiveSnaps],
  )
}

export function useFreezeSelectedNodePosition() {
  const nodes = useNodeStore(state => state.nodes)
  const selectedNodeId = useMonitorStore(state => state.selectedNodeId)

  const deleteNode = useNodeStore(state => state.deleteNode)
  const replaceNodeIdInLines = useLineStore(state => state.replaceNodeIdInLines)

  return useCallback(() => {
    const node = nodes.find(node => node.id === selectedNodeId)
    if (node) {
      const nonSelectedNodes = nodes.filter(node => selectedNodeId !== node.id)
      const closeByNode = getCloseByNode(node.position, nonSelectedNodes)
      if (closeByNode) {
        replaceNodeIdInLines(node.id, closeByNode.id)
        deleteNode(node.id)
        return closeByNode
      }
      return node
    }
  }, [selectedNodeId, nodes, replaceNodeIdInLines, deleteNode])
}
