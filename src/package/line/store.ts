import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { Line } from './types'

interface LineStore {
  lines: Line[]
  setLines: (lines: Line[]) => void
  createLine: (nodeIds: [string, string]) => void
}

export const useLineStore = create<LineStore>(set => ({
  lines: [],
  setLines: lines => set({ lines }),
  createLine: nodeIds => {
    const line = { id: nanoid(), nodeIds }
    set(state => ({ lines: [...state.lines, line] }))
    return line
  },
}))
