import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { Position } from '../geometry/types'
import { Node } from './types'

interface NodeStore {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  createNode: (position: Position) => Node
  updateNode: (id: string, position: Position) => void
  deleteNode: (id: string) => void
}

export const useNodeStore = create<NodeStore>(set => ({
  nodes: [],
  setNodes: nodes => set({ nodes }),
  createNode: position => {
    const node = initNode(position)
    set(state => ({ nodes: [...state.nodes, node] }))
    return node
  },
  updateNode: (id, position) => set(state => ({ nodes: updateNodePosition(id, position, state.nodes) })),
  deleteNode: id => set(state => ({ nodes: state.nodes.filter(node => node.id !== id) })),
}))

function initNode(position: Position): Node {
  return { id: nanoid(), position }
}

function updateNodePosition(id: string, position: Position, nodes: Node[]): Node[] {
  const otherNodes = nodes.filter(node => node.id !== id)
  const node = nodes.find(node => node.id === id)
  if (!node) return nodes
  return [...otherNodes, { ...node, position }]
}
