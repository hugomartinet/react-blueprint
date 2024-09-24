import { MutableRefObject } from 'react'
import { Grid } from '../grid/grid'
import { Lines } from '../line/lines'
import { useMouseDownEventListeners, useMouseMoveEventListeners } from '../mouse-events/hooks'
import { useSceneTransformationListener } from './hooks'
import { useSceneStore } from './store'

interface SceneProps {
  blueprintRef: MutableRefObject<HTMLDivElement | null>
}

export function Scene({ blueprintRef }: SceneProps) {
  const width = useSceneStore(state => state.width)
  const height = useSceneStore(state => state.height)

  useSceneTransformationListener(blueprintRef)
  useMouseDownEventListeners()
  useMouseMoveEventListeners()

  return (
    <svg width={width} height={height}>
      <Grid />
      <Lines />
    </svg>
  )
}
