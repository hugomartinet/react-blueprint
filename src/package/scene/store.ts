import { create } from 'zustand'
import { Position } from '../geometry/types'

interface SceneStore {
  width: number
  height: number
  position: Position
  scale: number
  setView: (position: Position, scale: number) => void
}

export const useSceneStore = create<SceneStore>(set => ({
  width: 1000,
  height: 1000,
  position: { x: 0, y: 0 },
  scale: 1,
  setView: (position, scale) => set({ position, scale }),
}))
