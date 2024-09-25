import { useMode, useSetIdleMode, useSetSelectMode } from './package/mode/hooks'
import { Mode } from './package/mode/types'
import { Colors } from './package/theme'

export function Controls() {
  const mode = useMode()
  const setSelectMode = useSetSelectMode()
  const setIdleMode = useSetIdleMode()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: 8,
        alignItems: 'center',
        background: Colors.blue,
        padding: 10,
      }}
    >
      <button onClick={() => setSelectMode()} disabled={mode === Mode.SELECT}>
        Select
      </button>
      <button onClick={() => setIdleMode()} disabled={mode === Mode.IDLE || mode === Mode.DRAW}>
        Draw line
      </button>
    </div>
  )
}
