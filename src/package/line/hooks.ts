import { useCallback } from 'react'
import { Position } from '../geometry/types'
import { useModeStore } from '../mode/store'
import { Mode } from '../mode/types'
import { useFreezeSelectedNodePosition } from '../node/hooks'
import { useNodeStore } from '../node/store'
import { useInitSnaps } from '../snap/hooks'
import { useSnapStore } from '../snap/store'
import { useLineStore } from './store'

export function useWaitForDrawingLine() {
  const setMode = useModeStore(state => state.setMode)

  const createNode = useNodeStore(state => state.createNode)
  const setSelectedNodeId = useNodeStore(state => state.setSelectedNodeId)

  const initSnaps = useInitSnaps()

  return useCallback(() => {
    setMode(Mode.IDLE)
    const node = createNode({ x: 0, y: 0 })
    setSelectedNodeId(node.id)
    initSnaps()
  }, [setMode, createNode, setSelectedNodeId, initSnaps])
}

export function useStartDrawingLine() {
  const setMode = useModeStore(state => state.setMode)
  const createNode = useNodeStore(state => state.createNode)
  const createLine = useLineStore(state => state.createLine)

  const freezeSelectedNodePosition = useFreezeSelectedNodePosition()
  const setSelectedNodeId = useNodeStore(state => state.setSelectedNodeId)

  return useCallback(
    (position: Position) => {
      setMode(Mode.DRAW)
      const node0 = freezeSelectedNodePosition()
      if (!node0) return // TODO handle this case
      const node1 = createNode(position)
      createLine([node0.id, node1.id])
      setSelectedNodeId(node1.id)
    },
    [setMode, freezeSelectedNodePosition, createNode, createLine, setSelectedNodeId],
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
