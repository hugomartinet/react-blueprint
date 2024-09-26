import { useCallback } from 'react'
import { Position } from '../geometry/types'
import { useLineStore } from '../line/store'
import { replaceNodeIdInLines } from '../line/utils'
import { useSnapStore } from '../snap/store'
import { getSnapClosestPosition, getPrioritySnap, activateSnaps } from '../snap/utils'
import { useNodeStore } from './store'
import { getCloseByNode } from './utils'

export function useUpdateNodePositions() {
  const updateNode = useNodeStore(state => state.updateNode)
  const selectedNodeId = useNodeStore(state => state.selectedNodeId)

  const setSnaps = useSnapStore(state => state.setSnaps)

  return useCallback(
    (position: Position) => {
      if (selectedNodeId) {
        const snaps = useSnapStore.getState().snaps
        const activatedSnaps = activateSnaps(position, snaps)
        setSnaps(activatedSnaps)
        const prioritySnap = getPrioritySnap(activatedSnaps)
        const prioriySnapPosition = prioritySnap && getSnapClosestPosition(position, prioritySnap)
        updateNode(selectedNodeId, prioriySnapPosition ?? position)
      }
    },
    [selectedNodeId, updateNode, setSnaps],
  )
}

export function useFreezeSelectedNodePosition() {
  const deleteNode = useNodeStore(state => state.deleteNode)
  const selectedNodeId = useNodeStore(state => state.selectedNodeId)

  const setLines = useLineStore(state => state.setLines)

  return useCallback(() => {
    const nodes = useNodeStore.getState().nodes
    const lines = useLineStore.getState().lines
    const node = nodes.find(node => node.id === selectedNodeId)
    if (node) {
      const nonSelectedNodes = nodes.filter(node => selectedNodeId !== node.id)
      const closeByNode = getCloseByNode(node.position, nonSelectedNodes)
      if (closeByNode) {
        setLines(replaceNodeIdInLines(lines, node.id, closeByNode.id))
        deleteNode(node.id)
        return closeByNode
      }
      return node
    }
  }, [selectedNodeId, setLines, deleteNode])
}
