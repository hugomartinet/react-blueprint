import { useCallback } from 'react'
import { useModeStore } from './store'
import { Mode } from './types'

export function useMode() {
  return useModeStore(state => state.mode)
}

export function useSetSelectMode() {
  const setMode = useModeStore(state => state.setMode)
  return useCallback(() => {
    setMode(Mode.SELECT)
  }, [setMode])
}
