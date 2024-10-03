import { MutableRefObject } from 'react'
import { Position } from '../geometry/types'

export function getEventPosition(event: MouseEvent): Position {
  return { x: event.offsetX, y: event.offsetY }
}

export function isEventInFrame(event: MouseEvent, blueprintRef: MutableRefObject<HTMLDivElement | null>) {
  if (!blueprintRef.current) return false
  const { x, y } = event
  const { top, left, width, height } = blueprintRef.current.getBoundingClientRect()
  return x >= left && x <= left + width && y >= top && y <= top + height
}
