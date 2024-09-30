import { useEffect } from 'react'
import { useStartDrawingLine, useStopDrawingLine, useWaitForDrawingLine } from '../line/hooks'
import { useModeStore } from '../mode/store'
import { Mode } from '../mode/types'
import { useUpdateNodePositions } from '../node/hooks'
import { getEventPosition } from './utils'

export function useMouseDownEventListeners() {
  const startDrawingLine = useStartDrawingLine()
  const stopDrawingLine = useStopDrawingLine()
  const waitForDrawingLine = useWaitForDrawingLine()

  useEffect(() => {
    function onMouseDown(event: MouseEvent): void {
      const mode = useModeStore.getState().mode
      if (mode === Mode.IDLE) {
        startDrawingLine(getEventPosition(event))
      } else if (mode === Mode.DRAW) {
        stopDrawingLine()
        waitForDrawingLine()
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    return () => window.removeEventListener('mousedown', onMouseDown)
  }, [startDrawingLine, stopDrawingLine, waitForDrawingLine])
}

export function useMouseMoveEventListeners() {
  const updateNodePosition = useUpdateNodePositions()

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      const mode = useModeStore.getState().mode
      if (mode === Mode.IDLE || mode === Mode.DRAW) {
        updateNodePosition(getEventPosition(event))
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [updateNodePosition])
}
