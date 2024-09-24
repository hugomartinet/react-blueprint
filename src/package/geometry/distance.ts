import { LineCoefficients, Position } from './types'

export function getDistanceBetweenPositions(position0: Position, position1: Position): number {
  return Math.sqrt((position1.x - position0.x) ** 2 + (position1.y - position0.y) ** 2)
}

export function getClosestPositionOnLine({ x, y }: Position, { m, b }: LineCoefficients): Position {
  return { x: (y - b) / m + x / (m * m), y: y + x / m }
}
