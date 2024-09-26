import { Scene } from './types'

export function calculateCenteredView(scene: Scene, blueprintWidth: number, blueprintHeight: number) {
  const minX = Math.min(...scene.nodes.map(node => node.position.x)) - 100
  const minY = Math.min(...scene.nodes.map(node => node.position.y)) - 100
  const maxX = Math.max(...scene.nodes.map(node => node.position.x)) + 100
  const maxY = Math.max(...scene.nodes.map(node => node.position.y)) + 100

  const scaleX = blueprintWidth / (maxX - minX)
  const scaleY = blueprintHeight / (maxY - minY)
  const scale = Math.min(scaleX, scaleY)

  return { x: -minX * scale, y: -minY * scale, scale }
}
