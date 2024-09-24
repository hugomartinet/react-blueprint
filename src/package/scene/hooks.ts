import { MutableRefObject, useEffect } from 'react'
import { useTransformEffect } from 'react-zoom-pan-pinch'
import { useSceneStore } from './store'

export function useSceneTransformationListener(blueprintRef: MutableRefObject<HTMLDivElement | null>) {
  const setView = useSceneStore(state => state.setView)

  useEffect(() => {
    setView({ x: blueprintRef.current?.offsetLeft ?? 0, y: blueprintRef.current?.offsetTop ?? 0 }, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useTransformEffect(({ state }) => {
    setView(
      {
        x: state.positionX + (blueprintRef.current?.offsetLeft ?? 0),
        y: state.positionY + (blueprintRef.current?.offsetTop ?? 0),
      },
      state.scale,
    )
  })
}
