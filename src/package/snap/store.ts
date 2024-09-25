import { create } from 'zustand'
import { Line } from '../line/types'
import { Node } from '../node/types'
import { Snap } from './types'
import { calculateLineSnaps, calculateNodeSnaps } from './utils'

interface SnapStore {
  snaps: Snap[]
  initSnaps: (nodes: Node[], lines: Line[]) => void
  setActiveSnaps: (snaps: Snap[]) => void
}

export const useSnapStore = create<SnapStore>(set => ({
  snaps: [],
  initSnaps: (nodes, lines) => {
    const nodeSnaps = calculateNodeSnaps(nodes)
    const lineSnaps = calculateLineSnaps(lines, nodes)
    set({ snaps: [...nodeSnaps, ...lineSnaps] })
  },
  setActiveSnaps: snaps => {
    const activeSnapIds = snaps.map(snap => snap.id)
    set(state => ({ snaps: state.snaps.map(snap => ({ ...snap, isActive: activeSnapIds.includes(snap.id) })) }))
  },
}))
