import { Node } from '../node/types'
import { Colors } from '../theme'
import { getAngleInPlan, getDistanceBetweenPositions } from './utils'

interface RulerProps {
  nodes: [Node, Node]
}

export function Ruler({ nodes }: RulerProps) {
  const angle = getAngleInPlan(nodes[0].position, nodes[1].position)
  const isAngleInFirstQuadrant = angle >= -90 && angle <= 90

  const x0 = nodes[0].position.x
  const y0 = nodes[0].position.y
  const x1 = nodes[1].position.x
  const y1 = nodes[1].position.y
  const midX = (x0 + x1) / 2
  const midY = (y0 + y1) / 2

  const dx = x1 - x0
  const dy = y1 - y0
  const length = getDistanceBetweenPositions(nodes[0].position, nodes[1].position)

  const offset = 20
  const tx = (-dy / length) * offset
  const ty = (dx / length) * offset

  return (
    <g transform={isAngleInFirstQuadrant ? `translate(${tx}, ${ty})` : `translate(${-tx}, ${-ty})`}>
      <line stroke={Colors.teal} strokeWidth={1} x1={x0} y1={y0} x2={x1} y2={y1} />
      <g transform={`rotate(${angle} ${x0} ${y0})`}>
        <polygon points={`${x0} ${y0 - 4}, ${x0 + 7} ${y0}, ${x0} ${y0 + 4}`} fill={Colors.teal} />
      </g>
      <g transform={`rotate(${angle} ${x1} ${y1})`}>
        <polygon points={`${x1} ${y1 - 4}, ${x1 - 7} ${y1}, ${x1} ${y1 + 4}`} fill={Colors.teal} />
      </g>
      <g transform={`rotate(${isAngleInFirstQuadrant ? angle : angle + 180} ${midX} ${midY})`}>
        <g>
          <rect x={midX - 24} y={midY - 9} width="48" height="18" fill={Colors.teal} rx="5" ry="5" />
          <text
            x={midX}
            y={midY + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="12"
            fontFamily="sans-serif"
          >
            {length} cm
          </text>
        </g>
      </g>
    </g>
  )
}
