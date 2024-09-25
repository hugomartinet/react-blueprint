import { useNodeStore } from '../node/store'
import { Colors } from '../theme'
import { useLineStore } from './store'

export function Lines() {
  const lines = useLineStore(state => state.lines)
  const nodes = useNodeStore(state => state.nodes)

  return (
    <>
      {lines.map(line => {
        const node0 = nodes.find(node => node.id === line.nodeIds[0])
        const node1 = nodes.find(node => node.id === line.nodeIds[1])
        if (!node0 || !node1) return
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
