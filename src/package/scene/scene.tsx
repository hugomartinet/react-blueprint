import { MutableRefObject } from 'react'
import { Grid } from '../grid/grid'
import { Lines } from '../line/lines'
import { useMouseDownEventListeners, useMouseMoveEventListeners } from '../mouse-events/hooks'
import { Snaps } from '../snap/snaps'
import { Colors } from '../theme'
import { useLoadScene } from './hooks'
import { useSceneStore } from './store'
import { Scene as SceneType } from './types'

interface SceneProps {
  blueprintRef: MutableRefObject<HTMLDivElement | null>
  initialScene?: SceneType
}

export function Scene({ blueprintRef, initialScene }: SceneProps) {
  const width = useSceneStore(state => state.width)
  const height = useSceneStore(state => state.height)

  useMouseDownEventListeners()
  useMouseMoveEventListeners()

  useLoadScene(initialScene, blueprintRef)

  return (
    <svg width={width} height={height} style={{ backgroundColor: Colors.lightGray }}>
      <Grid />
      <Lines />
      <Snaps />
    </svg>
  )
}
