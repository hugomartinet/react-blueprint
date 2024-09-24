import { create } from 'zustand'
import { Mode } from './types'

interface ModeStore {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const useModeStore = create<ModeStore>(set => ({
  mode: Mode.SELECT,
  setMode: mode => set({ mode }),
}))
