import { useModeStore } from './package/mode/store'
import { Mode } from './package/mode/types'

export function Controls() {
  const mode = useModeStore(state => state.mode)
  const setMode = useModeStore(state => state.setMode)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: 8,
        alignItems: 'center',
        background: '#4299E1',
        padding: 10,
      }}
    >
      <button onClick={() => setMode(Mode.SELECT)} disabled={mode === Mode.SELECT}>
        Select
      </button>
      <button onClick={() => setMode(Mode.IDLE)} disabled={mode === Mode.IDLE || mode === Mode.DRAW}>
        Draw line
      </button>
    </div>
  )
}
