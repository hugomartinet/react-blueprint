import { ChangeEvent, MutableRefObject, useCallback, useEffect, useState } from 'react'
import { Dimensions } from '../geometry/types'
import { getDistanceBetweenPositions } from '../geometry/utils'
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

export function useBackgroundScaleInputProps() {
  const setDimensions = useBackgroundStore(state => state.setDimensions)

  const [value, setValue] = useState(0)
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(Number(event.target.value)),
    [setValue],
  )

  const onSubmit = useCallback(() => {
    const dimensions = useBackgroundStore.getState().dimensions
    const adjustingNodes = useBackgroundStore.getState().adjustingNodes
    if (!dimensions || !adjustingNodes[0] || !adjustingNodes[1]) return
    const distanceBetweenNodes = getDistanceBetweenPositions(adjustingNodes[0].position, adjustingNodes[1].position)
    const width = (value * dimensions.width) / distanceBetweenNodes
    const height = (value * dimensions.height) / distanceBetweenNodes
    setDimensions({ width, height })
    return { width, height }
  }, [value, setDimensions])

  return { inputProps: { value, onChange }, onSubmit }
}
