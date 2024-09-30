import { create } from 'zustand'
import { Snap } from './types'

interface SnapStore {
  snaps: Snap[]
  activeSnaps: Snap[]
  setSnaps: (snaps: Snap[]) => void
}

export const useSnapStore = create<SnapStore>(set => ({
  snaps: [],
  activeSnaps: [],
  setSnaps: snaps => set({ snaps, activeSnaps: snaps.filter(snap => snap.isActive) }),
}))
