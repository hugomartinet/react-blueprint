import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { Line } from './types'

interface LineStore {
  lines: Line[]
  setLines: (lines: Line[]) => void
  createLine: (nodeIds: [string, string]) => void
  replaceNodeIdInLines: (oldNodeId: string, newNodeId: string) => void
}

export const useLineStore = create<LineStore>(set => ({
  lines: [],
  setLines: lines => set({ lines }),
  createLine: nodeIds => {
    const line = { id: nanoid(), nodeIds }
    set(state => ({ lines: [...state.lines, line] }))
    return line
  },
  replaceNodeIdInLines: (oldNodeId, newNodeId) => {
    set(state => ({ lines: state.lines.map(line => replaceNodeIdInLine(line, oldNodeId, newNodeId)) }))
  },
}))

function replaceNodeIdInLine(line: Line, oldNodeId: string, newNodeId: string): Line {
  const newNodeIds = [
    line.nodeIds[0] === oldNodeId ? newNodeId : line.nodeIds[0],
    line.nodeIds[1] === oldNodeId ? newNodeId : line.nodeIds[1],
  ] as [string, string]
  return { ...line, nodeIds: newNodeIds }
}
