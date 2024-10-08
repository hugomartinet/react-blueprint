import { useShallow } from 'zustand/react/shallow'
import { Colors } from '../theme'
import { useNodeStore } from './store'

export function Nodes() {
  const nodes = useNodeStore(useShallow(state => state.nodes))
  const selectedNodeId = useNodeStore(useShallow(state => state.selectedNodeId))
  return (
    <>
      {nodes
        .filter(node => selectedNodeId === node.id)
        .map(node => (
          <circle
            key={node.id}
            cx={node.position.x}
            cy={node.position.y}
            r={4}
            fill={Colors.white}
            stroke={Colors.gray}
            strokeWidth={2}
          />
        ))}
    </>
  )
}
