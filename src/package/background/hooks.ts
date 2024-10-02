import { MutableRefObject, useCallback, useEffect } from 'react'
import { Dimensions } from '../geometry/types'
import { useModeStore } from '../mode/store'
import { Mode } from '../mode/types'
import { getEventPosition } from '../mouse-events/utils'
import { useBackgroundStore } from './store'
import { calculateAdjustingNodesNewPosition, createFirstAdjustingNode, createSecondAdjustingNode } from './utils'

export function useBackground(
  dimensions: Dimensions | undefined,
  blueprintRef: MutableRefObject<HTMLDivElement | null>,
) {
  const setDimensions = useBackgroundStore(state => state.setDimensions)

  useEffect(() => {
    if (blueprintRef.current) {
      setDimensions({
        width: dimensions?.width ?? blueprintRef.current.offsetWidth,
        height: dimensions?.height ?? blueprintRef.current.offsetHeight,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useStartAdjustingBackground() {
  const setMode = useModeStore(state => state.setMode)

  const setAdjustingNodes = useBackgroundStore(state => state.setAdjustingNodes)

  return useCallback(() => {
    setMode(Mode.ADJUST_BACKGROUND)
    setAdjustingNodes(createFirstAdjustingNode({ x: 0, y: 0 }))
  }, [setMode, setAdjustingNodes])
}

export function useAdjustBackgroundMouseEventListeners() {
  const setMode = useModeStore(state => state.setMode)
  const setAdjustingNodes = useBackgroundStore(state => state.setAdjustingNodes)

  useEffect(() => {
    function onMouseDown(event: MouseEvent): void {
      const mode = useModeStore.getState().mode
      if (mode === Mode.ADJUST_BACKGROUND) {
        const adjustingNodes = useBackgroundStore.getState().adjustingNodes
        if (adjustingNodes[1]) {
          setMode(Mode.FINISH_ADJUSTING_BACKGROUND)
        } else {
          setAdjustingNodes(createSecondAdjustingNode(getEventPosition(event), adjustingNodes))
        }
      }
    }
    function onMouseMove(event: MouseEvent) {
      const mode = useModeStore.getState().mode
      if (mode === Mode.ADJUST_BACKGROUND) {
        const adjustingNodes = useBackgroundStore.getState().adjustingNodes
        setAdjustingNodes(calculateAdjustingNodesNewPosition(event, adjustingNodes))
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [setMode, setAdjustingNodes])
}
