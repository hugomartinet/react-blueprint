import { create } from 'zustand'
import { Snap } from './types'

interface SnapStore {
  snaps: Snap[]
  setSnaps: (snaps: Snap[]) => void
}

export const useSnapStore = create<SnapStore>(set => ({
  snaps: [],
  setSnaps: snaps => set({ snaps }),
}))
