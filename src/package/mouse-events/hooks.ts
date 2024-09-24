import { useCallback, useEffect } from 'react'
import { useStartDrawingLine, useStopDrawingLine } from '../line/hooks'
import { useModeStore } from '../mode/store'
import { Mode } from '../mode/types'
import { useUpdateNodePositions } from '../node/hooks'
import { useSceneStore } from '../scene/store'

function useGetEventPosition() {
  const x = useSceneStore(state => state.position.x)
  const y = useSceneStore(state => state.position.y)
  const scale = useSceneStore(state => state.scale)

  return useCallback((event: MouseEvent) => ({ x: (event.x - x) / scale, y: (event.y - y) / scale }), [x, y, scale])
}

export function useMouseDownEventListeners() {
  const getEventPosition = useGetEventPosition()
  const mode = useModeStore(state => state.mode)
  const setMode = useModeStore(state => state.setMode)

  const startDrawingLine = useStartDrawingLine()
  const stopDrawingLine = useStopDrawingLine()

  useEffect(() => {
    function onMouseDown(event: MouseEvent): void {
      if (mode === Mode.IDLE) {
        const position = getEventPosition(event)
        setMode(Mode.DRAW)
        startDrawingLine(position)
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    return () => window.removeEventListener('mousedown', onMouseDown)
  }, [mode, setMode, startDrawingLine, getEventPosition])

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
  const getEventPosition = useGetEventPosition()
  const mode = useModeStore(state => state.mode)

  const updateNodePosition = useUpdateNodePositions()

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (mode === Mode.DRAW) {
        const position = getEventPosition(event)
        updateNodePosition(position)
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mode, updateNodePosition, getEventPosition])
}
