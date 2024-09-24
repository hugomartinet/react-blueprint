import { useRef } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { Scene } from './scene/scene'

interface BlueprintProps {
  width?: number
  height?: number
}

export function Blueprint({ width, height }: BlueprintProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} style={{ width, height, overflow: 'hidden' }}>
      <TransformWrapper limitToBounds={false}>
        <TransformComponent wrapperStyle={{ flex: 1, backgroundColor: '#e2e8f0' }}>
          <Scene blueprintRef={ref} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
