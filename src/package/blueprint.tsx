import { useRef } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { Scene } from './scene/scene'
import { Scene as SceneType } from './scene/types'
import { Colors } from './theme'

interface BlueprintProps {
  width?: number
  height?: number
  initialScene?: SceneType
}

export function Blueprint({ width, height, initialScene }: BlueprintProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} style={{ flex: 1, width, height, overflow: 'hidden' }}>
      <TransformWrapper minScale={0.2} limitToBounds={false}>
        <TransformComponent wrapperStyle={{ flex: 1, backgroundColor: Colors.darkGray }}>
          <Scene initialScene={initialScene} blueprintRef={ref} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
