export interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
}

export function passDefaults(obj: Record<string, string | number | undefined>): IconProps {
  let size = 24
  let color = 'white'
  let strokeWidth = 1.5

  if (obj.size) size = obj.size as number
  if (obj.color) color = obj.color as string
  if (obj.strokeWidth) strokeWidth = obj.strokeWidth as number

  return { size, color, strokeWidth }
}
