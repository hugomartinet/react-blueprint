import { useCallback } from 'react'
import { Position } from '../geometry/types'
import { useFreezeSelectedNodePosition } from '../node/hooks'
import { useNodeStore } from '../node/store'
import { useSnapStore } from '../snap/store'
import { useLineStore } from './store'

export function useStartDrawingLine() {
  const createNode = useNodeStore(state => state.createNode)
  const createLine = useLineStore(state => state.createLine)

  const freezeSelectedNodePosition = useFreezeSelectedNodePosition()
  const setSelectedNodeId = useNodeStore(state => state.setSelectedNodeId)

  return useCallback(
    (position: Position) => {
      const node0 = freezeSelectedNodePosition()
      if (!node0) return // TODO handle this case
      const node1 = createNode(position)
      createLine([node0.id, node1.id])
      setSelectedNodeId(node1.id)
    },
    [freezeSelectedNodePosition, createNode, createLine, setSelectedNodeId],
  )
}

export function useStopDrawingLine() {
  const freezeSelectedNodePosition = useFreezeSelectedNodePosition()
  const setSelectedNodeId = useNodeStore(state => state.setSelectedNodeId)
  const setSnaps = useSnapStore(state => state.setSnaps)

  return useCallback(() => {
    freezeSelectedNodePosition()
    setSelectedNodeId(undefined)
    setSnaps([])
  }, [freezeSelectedNodePosition, setSelectedNodeId, setSnaps])
}
