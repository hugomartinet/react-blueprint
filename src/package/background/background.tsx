import { MutableRefObject } from 'react'
import { Dimensions } from '../geometry/types'
import { useModeStore } from '../mode/store'
import { isBackgroundMode } from '../mode/types'
import { AdjustingLine } from './adjusting-line'
import { useBackground } from './hooks'
import { useBackgroundStore } from './store'

interface BackgroundProps {
  src: string
  dimensions?: Dimensions
  blueprintRef: MutableRefObject<HTMLDivElement | null>
}

export function Background({ src, dimensions, blueprintRef }: BackgroundProps) {
  const backgroundDimensions = useBackgroundStore(state => state.dimensions)
  const mode = useModeStore(state => state.mode)

  useBackground(dimensions, blueprintRef)

  return (
    <>
      <image href={src} opacity={0.3} width={backgroundDimensions?.width} height={backgroundDimensions?.height} />
      {isBackgroundMode(mode) && <AdjustingLine />}
    </>
  )
}
