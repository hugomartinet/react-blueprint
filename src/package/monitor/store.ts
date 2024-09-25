import { create } from 'zustand'

interface MonitorStore {
  selectedNodeId: string | undefined
  setSelectedNodeId: (nodeId: string | undefined) => void
}

export const useMonitorStore = create<MonitorStore>(set => ({
  selectedNodeId: undefined,
  setSelectedNodeId: nodeId => set({ selectedNodeId: nodeId }),
}))
