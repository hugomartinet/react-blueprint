import { LineCoefficients, Position } from './types'

export function getDistanceBetweenPositions(position0: Position, position1: Position): number {
  return Math.round(Math.sqrt((position1.x - position0.x) ** 2 + (position1.y - position0.y) ** 2))
}

export function getClosestPositionOnLine({ x, y }: Position, { a, b, c }: LineCoefficients): Position {
  const d = a * a + b * b
  return { x: (b * (b * x - a * y) - a * c) / d, y: (a * (-b * x + a * y) - b * c) / d }
}

export function getAngleInPlan(position0: Position, position1: Position) {
  return +((-Math.atan2(position0.y - position1.y, position1.x - position0.x) * 180) / Math.PI).toFixed(1)
}
