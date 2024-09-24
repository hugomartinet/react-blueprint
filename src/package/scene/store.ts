import { create } from 'zustand'
import { Scene } from './types'

interface SceneStore {
  width: number
  height: number
  setScene: (scene: Scene) => void
}

export const useSceneStore = create<SceneStore>(set => ({
  width: 10000,
  height: 10000,
  setScene: scene => set({ width: scene.width, height: scene.height }),
}))
