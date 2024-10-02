import { Colors } from '../theme'
import { useAdjustBackgroundMouseEventListeners } from './hooks'
import { useBackgroundStore } from './store'

export function AdjustingLine() {
  const adjustingNodes = useBackgroundStore(state => state.adjustingNodes)

  useAdjustBackgroundMouseEventListeners()

  return (
    <>
      {adjustingNodes[0] && adjustingNodes[1] && (
        <line
          stroke={Colors.red}
          strokeWidth={2}
          strokeDasharray="10,10"
          x1={adjustingNodes[0].position.x}
          y1={adjustingNodes[0].position.y}
          x2={adjustingNodes[1].position.x}
          y2={adjustingNodes[1].position.y}
        />
      )}
      {adjustingNodes[0] && (
        <circle
          cx={adjustingNodes[0].position.x}
          cy={adjustingNodes[0].position.y}
          r={4}
          fill={Colors.white}
          stroke={Colors.gray}
          strokeWidth={2}
        />
      )}
      {adjustingNodes[1] && (
        <circle
          cx={adjustingNodes[1].position.x}
          cy={adjustingNodes[1].position.y}
          r={4}
          fill={Colors.white}
          stroke={Colors.gray}
          strokeWidth={2}
        />
      )}
    </>
  )
}
