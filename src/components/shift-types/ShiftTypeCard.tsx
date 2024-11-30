import { ShiftType } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { formatTime } from "@/lib/date"
import { Clock } from "lucide-react"

interface ShiftTypeCardProps {
  shiftType: ShiftType
  className?: string
}

export function ShiftTypeCard({ shiftType, className }: ShiftTypeCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-3">
        <div 
          className="w-full h-20 rounded-lg flex items-center justify-center"
          style={{ 
            backgroundColor: shiftType.color,
            color: 'white'
          }}
        >
          <Clock className="w-8 h-8" />
        </div>
        
        <div>
          <div className="font-medium">{shiftType.name}</div>
          <div className="text-sm text-muted-foreground">
            {formatTime(shiftType.start_time)} - {formatTime(shiftType.end_time)}
          </div>
          {shiftType.description && (
            <div className="text-sm mt-2 text-muted-foreground">
              {shiftType.description}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}