import { useEffect } from 'react'
import { useStartDrawingLine, useStopDrawingLine } from '../line/hooks'
import { useMode, useSetDrawMode, useSetIdleMode } from '../mode/hooks'
import { useModeStore } from '../mode/store'
import { Mode } from '../mode/types'
import { useUpdateNodePositions } from '../node/hooks'
import { getEventPosition } from './utils'

export function useMouseDownEventListeners() {
  const mode = useMode()
  const setIdleMode = useSetIdleMode()
  const setDrawMode = useSetDrawMode()

  const startDrawingLine = useStartDrawingLine()
  const stopDrawingLine = useStopDrawingLine()

  useEffect(() => {
    function onMouseDown(event: MouseEvent): void {
      if (mode === Mode.IDLE) {
        setDrawMode()
        startDrawingLine(getEventPosition(event))
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    return () => window.removeEventListener('mousedown', onMouseDown)
  }, [mode, setDrawMode, startDrawingLine])

  useEffect(() => {
    function onMouseDown(): void {
      if (mode === Mode.DRAW) {
        stopDrawingLine()
        setIdleMode()
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    return () => window.removeEventListener('mousedown', onMouseDown)
  }, [mode, setIdleMode, stopDrawingLine])
}

export function useMouseMoveEventListeners() {
  const mode = useModeStore(state => state.mode)

  const updateNodePosition = useUpdateNodePositions()

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (mode === Mode.IDLE || mode === Mode.DRAW) {
        updateNodePosition(getEventPosition(event))
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mode, updateNodePosition])
}
