import { MutableRefObject } from 'react'
import { Background } from '../background/background'
import { Dimensions } from '../geometry/types'
import { Grid } from '../grid/grid'
import { Lines } from '../line/lines'
import { useMode } from '../mode/hooks'
import { isBackgroundMode } from '../mode/types'
import { useMouseDownEventListeners, useMouseMoveEventListeners } from '../mouse-events/hooks'
import { Nodes } from '../node/nodes'
import { Snaps } from '../snap/snaps'
import { Colors } from '../theme'
import { useLoadScene } from './hooks'
import { useSceneStore } from './store'
import { Scene as SceneType } from './types'

interface SceneProps {
  initialScene?: SceneType
  background?: { src: string; dimensions?: Dimensions }
  blueprintRef: MutableRefObject<HTMLDivElement | null>
}

export function Scene({ initialScene, background, blueprintRef }: SceneProps) {
  const mode = useMode()
  const width = useSceneStore(state => state.width)
  const height = useSceneStore(state => state.height)

  useMouseDownEventListeners()
  useMouseMoveEventListeners()

  useLoadScene(initialScene, blueprintRef)

  return (
    <svg width={width} height={height} style={{ backgroundColor: Colors.lightGray }}>
      {background && <Background src={background.src} dimensions={background.dimensions} blueprintRef={blueprintRef} />}
      <Grid />
      {!isBackgroundMode(mode) && (
        <>
          <Lines />
          <Nodes />
          <Snaps />
        </>
      )}
    </svg>
  )
}
