import { LineCoefficients, Position } from '../geometry/types'

export interface Snap {
  id: string
  priority: number
  distance: number
  isActive: boolean
}

export type NodeSnap = Snap & {
  position: Position
}

export function isNodeSnap(snap: Snap): snap is NodeSnap {
  return 'position' in snap
}

export type LineSnap = Snap & {
  coefficients: LineCoefficients
}

export function isLineSnap(snap: Snap): snap is LineSnap {
  return 'coefficients' in snap
}
