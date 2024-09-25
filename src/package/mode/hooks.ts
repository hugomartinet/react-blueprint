import { useCallback } from 'react'
import { useLineStore } from '../line/store'
import { useMonitorStore } from '../monitor/store'
import { useNodeStore } from '../node/store'
import { useSnapStore } from '../snap/store'
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

  const nodes = useNodeStore(state => state.nodes)
  const lines = useLineStore(state => state.lines)
  const createNode = useNodeStore(state => state.createNode)

  const setSelectedNodeId = useMonitorStore(state => state.setSelectedNodeId)
  const initSnaps = useSnapStore(state => state.initSnaps)

  return useCallback(() => {
    setMode(Mode.IDLE)
    const node = createNode({ x: 0, y: 0 })
    setSelectedNodeId(node.id)
    initSnaps(nodes, lines)
  }, [nodes, lines, setMode, createNode, setSelectedNodeId, initSnaps])
}

export function useSetDrawMode() {
  const setMode = useModeStore(state => state.setMode)
  return useCallback(() => setMode(Mode.DRAW), [setMode])
}
