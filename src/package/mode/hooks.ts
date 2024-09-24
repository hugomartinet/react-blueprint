import { useModeStore } from './store'

export function useSetMode() {
  return useModeStore(state => state.setMode)
}
