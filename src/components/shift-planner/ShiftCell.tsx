import { ShiftType } from "@/types"
import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/date"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/shared/Tooltip"

interface ShiftCellProps {
  shiftType?: ShiftType
  isWeekend?: boolean
  onRemove?: () => void
  onDragOver?: (e: React.DragEvent) => void
  onDragLeave?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  className?: string
}

export function ShiftCell({ 
  shiftType, 
  isWeekend, 
  onRemove,
  onDragOver,
  onDragLeave,
  onDrop,
  className 
}: ShiftCellProps) {
  if (!shiftType) {
    return (
      <div 
        className={cn(
          "absolute inset-0 shift-cell transition-colors hover:bg-muted/50",
          isWeekend && "bg-muted/30",
          className
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      />
    )
  }

  return (
    <div 
      className={cn(
        "absolute inset-0 p-2 group",
        isWeekend && "bg-muted/30",
        className
      )}
    >
      <Tooltip content={`${formatTime(shiftType.start_time)} - ${formatTime(shiftType.end_time)}`}>
        <div
          className="h-full rounded-md p-2 relative"
          style={{ 
            backgroundColor: shiftType.color,
            opacity: 0.9
          }}
        >
          <div className="text-white text-sm font-medium">
            {shiftType.name}
          </div>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
            >
              <X className="h-3 w-3 text-white" />
            </Button>
          )}
        </div>
      </Tooltip>
    </div>
  )
}