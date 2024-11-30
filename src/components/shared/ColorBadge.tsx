interface ColorBadgeProps {
  color: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6'
}

export function ColorBadge({ color, size = 'md' }: ColorBadgeProps) {
  return (
    <div 
      className={`${sizes[size]} rounded-full`}
      style={{ backgroundColor: color }}
    />
  )
}