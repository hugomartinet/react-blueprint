import { create } from 'zustand'
import { Dimensions } from '../geometry/types'
import { AdjustingNodes } from './types'

interface BackgroundStore {
  dimensions?: Dimensions
  setDimensions: (dimensions: Dimensions) => void
  adjustingNodes: AdjustingNodes
  setAdjustingNodes: (nodes: AdjustingNodes) => void
}

export const useBackgroundStore = create<BackgroundStore>(set => ({
  setDimensions: dimensions => set({ dimensions }),
  adjustingNodes: [null, null],
  setAdjustingNodes: adjustingNodes => set({ adjustingNodes }),
}))
