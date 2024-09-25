import { useNodeStore } from '../node/store'
import { Colors } from '../theme'
import { useLineStore } from './store'
import { getLineNodes } from './utils'

export function Lines() {
  const lines = useLineStore(state => state.lines)
  const nodes = useNodeStore(state => state.nodes)

  return (
    <>
      {lines.map(line => {
        const [node0, node1] = getLineNodes(line, nodes)
        return (
          <line
            key={line.id}
            stroke={Colors.gray}
            strokeWidth={2}
            x1={node0.position.x}
            y1={node0.position.y}
            x2={node1.position.x}
            y2={node1.position.y}
          />
        )
      })}
    </>
  )
}
