import { useCallback } from 'react'
import { useLineStore } from '../line/store'
import { useNodeStore } from '../node/store'
import { useSnapStore } from './store'
import { calculateNodeSnaps, calculateLineSnaps } from './utils'

export function useInitSnaps() {
  const setSnaps = useSnapStore(state => state.setSnaps)

  return useCallback(() => {
    const nodes = useNodeStore.getState().nodes
    const lines = useLineStore.getState().lines
    const nodeSnaps = calculateNodeSnaps(nodes)
    const lineSnaps = calculateLineSnaps(lines, nodes)
    setSnaps([...nodeSnaps, ...lineSnaps])
  }, [setSnaps])
}
