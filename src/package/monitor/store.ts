import { create } from 'zustand'

interface MonitorStore {
  selectedNodeIds: string[]
  setSelectedNodeIds: (nodeIds: string[]) => void
}

export const useMonitorStore = create<MonitorStore>(set => ({
  selectedNodeIds: [],
  setSelectedNodeIds: nodeIds => set({ selectedNodeIds: nodeIds }),
}))
