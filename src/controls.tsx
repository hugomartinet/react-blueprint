import { useWaitForDrawingLine } from './package/line/hooks'
import { useMode, useSetSelectMode } from './package/mode/hooks'
import { Mode } from './package/mode/types'
import { Colors } from './package/theme'

export function Controls() {
  const mode = useMode()
  const setSelectMode = useSetSelectMode()
  const waitForDrawingLine = useWaitForDrawingLine()

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
      <button onClick={() => waitForDrawingLine()} disabled={mode === Mode.IDLE || mode === Mode.DRAW}>
        Draw line
      </button>
    </div>
  )
}
