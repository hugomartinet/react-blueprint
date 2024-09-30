import { useShallow } from 'zustand/react/shallow'
import { LineCoefficients, Position } from '../geometry/types'
import { useSceneStore } from '../scene/store'
import { Colors } from '../theme'
import { useSnapStore } from './store'
import { isLineSnap, isNodeSnap } from './types'

export function Snaps() {
  const activeSnaps = useSnapStore(useShallow(state => state.activeSnaps))
  const width = useSceneStore(state => state.width)
  const height = useSceneStore(state => state.height)

  return (
    <>
      {activeSnaps.map(snap => {
        if (isNodeSnap(snap)) return <NodeSnap key={snap.id} position={snap.position} />
        if (isLineSnap(snap))
          return <LineSnap key={snap.id} coefficients={snap.coefficients} width={width} height={height} />
      })}
    </>
  )
}

interface NodeSnapProps {
  position: Position
}

function NodeSnap({ position }: NodeSnapProps) {
  return <circle cx={position.x} cy={position.y} r={4} fill={Colors.white} stroke={Colors.blue} strokeWidth={2} />
}

interface LineSnapProps {
  coefficients: LineCoefficients
  width: number
  height: number
}

function LineSnap({ coefficients: { a, b, c }, width, height }: LineSnapProps) {
  const position0 = b !== 0 ? { x: 0, y: -c / b } : { x: -c / a, y: 0 }
  const position1 = b !== 0 ? { x: width, y: -(a * width + c) / b } : { x: -(b * height + c) / a, y: height }
  return (
    <line
      x1={position0.x}
      y1={position0.y}
      x2={position1.x}
      y2={position1.y}
      stroke={Colors.blue}
      strokeWidth={2}
      strokeDasharray="5,5"
    />
  )
}
