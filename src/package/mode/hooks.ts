import { useCallback } from 'react'
import { useNodeStore } from '../node/store'
import { useInitSnaps } from '../snap/hooks'
import { useModeStore } from './store'
import { Mode } from './types'

export function useMode() {
  return useModeStore(state => state.mode)
}

export function useSetSelectMode() {
  const setMode = useModeStore(state => state.setMode)
  return useCallback(() => setMode(Mode.SELECT), [setMode])
}

export function useSetIdleMode() {
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

export function useSetDrawMode() {
  const setMode = useModeStore(state => state.setMode)
  return useCallback(() => setMode(Mode.DRAW), [setMode])
}
