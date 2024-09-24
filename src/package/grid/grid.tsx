import { Fragment } from 'react/jsx-runtime'
import { useSceneStore } from '../scene/store'

const STEP = 100

export function Grid() {
  const width = useSceneStore(state => state.width)
  const height = useSceneStore(state => state.height)

  return (
    <g strokeWidth="1" stroke="white">
      {new Array(width / STEP + 1).fill(0).map((_, index) => (
        <Fragment key={index}>
          <line x1={index * STEP} y1={0} x2={index * STEP} y2={height} />
          <line x1={0} y1={index * STEP} x2={width} y2={index * STEP} />
        </Fragment>
      ))}
    </g>
  )
}
