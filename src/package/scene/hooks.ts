import { MutableRefObject, useEffect } from 'react'
import { useTransformInit } from 'react-zoom-pan-pinch'
import { useLineStore } from '../line/store'
import { useNodeStore } from '../node/store'
import { useSceneStore } from './store'
import { Scene } from './types'
import { calculateCenteredView } from './utils'

export function useLoadScene(scene: Scene | undefined, blueprintRef: MutableRefObject<HTMLDivElement | null>) {
  const setScene = useSceneStore(state => state.setDimensions)
  const setNodes = useNodeStore(state => state.setNodes)
  const setLines = useLineStore(state => state.setLines)

  useEffect(() => {
    if (scene) {
      setScene(scene)
      setNodes(scene.nodes)
      setLines(scene.lines)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useTransformInit(ref => {
    if (scene && blueprintRef.current) {
      const transformState = calculateCenteredView(
        scene,
        blueprintRef.current?.offsetWidth,
        blueprintRef.current?.offsetHeight,
      )
      ref.instance.setTransformState(transformState.scale, transformState.x, transformState.y)
    }
  })
}
