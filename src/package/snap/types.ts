import { LineCoefficients, Position } from '../geometry/types'

export interface Snap {
  priority: number
}

export type NodeSnap = Snap & {
  position: Position
  radius: number
}

export function isNodeSnap(snap: Snap): snap is NodeSnap {
  return 'position' in snap
}

export type LineSnap = Snap & {
  coefficients: LineCoefficients
  distance: number
}

export function isLineSnap(snap: Snap): snap is LineSnap {
  return 'coefficients' in snap
}
