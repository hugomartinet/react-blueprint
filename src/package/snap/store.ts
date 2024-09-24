import { create } from 'zustand'
import { Node } from '../node/types'
import { Snap } from './types'
import { calculateNodeSnaps } from './utils'

interface SnapStore {
  snaps: Snap[]
  initSnaps: (nodes: Node[]) => void
}

export const useSnapStore = create<SnapStore>(set => ({
  snaps: [],
  initSnaps: nodes => {
    const nodeSnaps = calculateNodeSnaps(nodes)
    set({ snaps: [...nodeSnaps] })
  },
}))
