import { useCallback } from 'react'
import { Position } from '../geometry/types'
import { useMonitorStore } from '../monitor/store'
import { useNodeStore } from '../node/store'
import { getCloseByNode } from '../node/utils'
import { useInitSnaps } from '../snap/hooks'
import { useLineStore } from './store'

export function useStartDrawingLine() {
  const nodes = useNodeStore(state => state.nodes)
  const createNode = useNodeStore(state => state.createNode)
  const createLine = useLineStore(state => state.createLine)

  const setSelectedNodeIds = useMonitorStore(state => state.setSelectedNodeIds)
  const initSnaps = useInitSnaps()

  return useCallback(
    (position: Position) => {
      const node0 = getCloseByNode(position, nodes) ?? createNode(position)
      const node1 = createNode(position)
      createLine([node0.id, node1.id])
      setSelectedNodeIds([node1.id])
      initSnaps()
    },
    [nodes, createNode, createLine, setSelectedNodeIds, initSnaps],
  )
}

export function useStopDrawingLine() {
  const nodes = useNodeStore(state => state.nodes)
  const deleteNode = useNodeStore(state => state.deleteNode)
  const replaceNodeIdInLines = useLineStore(state => state.replaceNodeIdInLines)

  const selectedNodeIds = useMonitorStore(state => state.selectedNodeIds)
  const setSelectedNodeIds = useMonitorStore(state => state.setSelectedNodeIds)

  return useCallback(() => {
    const nonSelectedNodes = nodes.filter(node => !selectedNodeIds.includes(node.id))
    selectedNodeIds.forEach(nodeId => {
      const node = nodes.find(node => node.id === nodeId)
      if (!node) return // TODO handle this case
      const closeByNode = getCloseByNode(node.position, nonSelectedNodes)
      if (closeByNode) {
        replaceNodeIdInLines(node.id, closeByNode.id)
        deleteNode(node.id)
      }
    })
    setSelectedNodeIds([])
  }, [nodes, deleteNode, replaceNodeIdInLines, selectedNodeIds, setSelectedNodeIds])
}
