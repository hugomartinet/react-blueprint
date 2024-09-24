import { useEffect } from 'react'
import { useStartDrawingLine, useStopDrawingLine } from '../line/hooks'
import { useModeStore } from '../mode/store'
import { Mode } from '../mode/types'
import { useUpdateNodePositions } from '../node/hooks'
import { getEventPosition } from './utils'

export function useMouseDownEventListeners() {
  const mode = useModeStore(state => state.mode)
  const setMode = useModeStore(state => state.setMode)

  const startDrawingLine = useStartDrawingLine()
  const stopDrawingLine = useStopDrawingLine()

  useEffect(() => {
    function onMouseDown(event: MouseEvent): void {
      if (mode === Mode.IDLE) {
        setMode(Mode.DRAW)
        startDrawingLine(getEventPosition(event))
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    return () => window.removeEventListener('mousedown', onMouseDown)
  }, [mode, setMode, startDrawingLine])

  useEffect(() => {
    function onMouseDown(): void {
      if (mode === Mode.DRAW) {
        stopDrawingLine()
        setMode(Mode.IDLE)
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    return () => window.removeEventListener('mousedown', onMouseDown)
  }, [mode, setMode, stopDrawingLine])
}

export function useMouseMoveEventListeners() {
  const mode = useModeStore(state => state.mode)

  const updateNodePosition = useUpdateNodePositions()

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (mode === Mode.DRAW) {
        updateNodePosition(getEventPosition(event))
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mode, updateNodePosition])
}
