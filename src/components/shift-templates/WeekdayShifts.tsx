import { ShiftTemplate } from "@/types"
import { Badge } from "@/components/ui/badge"

interface WeekdayShiftsProps {
  template: ShiftTemplate
}

const WEEKDAYS = [
  { key: 'monday', short: 'Mo' },
  { key: 'tuesday', short: 'Di' },
  { key: 'wednesday', short: 'Mi' },
  { key: 'thursday', short: 'Do' },
  { key: 'friday', short: 'Fr' },
  { key: 'saturday', short: 'Sa' },
  { key: 'sunday', short: 'So' }
] as const

export function WeekdayShifts({ template }: WeekdayShiftsProps) {
  return (
    <div className="flex gap-1">
      {WEEKDAYS.map(({ key, short }) => {
        const shift = template[key as keyof ShiftTemplate]
        const shiftType = shift?.shift_type

        return (
          <Badge
            key={key}
            variant={shiftType ? "default" : "outline"}
            className="min-w-8 justify-center"
            style={shiftType ? { 
              backgroundColor: shiftType.color,
              color: 'white'
            } : undefined}
          >
            {short}
          </Badge>
        )
      })}
    </div>
  )
}