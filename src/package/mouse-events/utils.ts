import { Position } from '../geometry/types'

export function getEventPosition(event: MouseEvent): Position {
  return { x: event.offsetX, y: event.offsetY }
}
