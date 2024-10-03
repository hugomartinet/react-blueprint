import { useCallback } from 'react'
import { useCleanupNodes } from '../node/hooks'
import { useModeStore } from './store'
import { Mode } from './types'

export function useMode() {
  return useModeStore(state => state.mode)
}

export function useSetSelectMode() {
  const setMode = useModeStore(state => state.setMode)
  const cleanupNodes = useCleanupNodes()
  return useCallback(() => {
    setMode(Mode.SELECT)
    cleanupNodes()
  }, [setMode, cleanupNodes])
}
