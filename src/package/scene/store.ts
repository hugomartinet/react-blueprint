import { create } from 'zustand'
import { Dimensions } from './types'

interface SceneStore {
  width: number
  height: number
  setDimensions: (dimensions: Dimensions) => void
}

export const useSceneStore = create<SceneStore>(set => ({
  width: 10000,
  height: 10000,
  setDimensions: dimensions => set({ ...dimensions }),
}))
