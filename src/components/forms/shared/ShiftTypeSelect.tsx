import { useShiftTypes } from "@/hooks/useShiftTypes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatTime } from "@/lib/date"

interface ShiftTypeSelectProps {
  value: number
  onChange: (value: number) => void
  required?: boolean
}

export function ShiftTypeSelect({ value, onChange, required }: ShiftTypeSelectProps) {
  const { shiftTypes } = useShiftTypes()

  return (
    <Select
      value={value.toString()}
      onValueChange={value => onChange(parseInt(value))}
      required={required}
    >
      <SelectTrigger>
        <SelectValue placeholder="Schichttyp wählen">
          {shiftTypes.find(t => t.ID === value)?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {shiftTypes.map(type => (
          <SelectItem 
            key={type.ID} 
            value={type.ID.toString()}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: type.color }}
              />
              <div>
                <div>{type.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatTime(type.start_time)} - {formatTime(type.end_time)}
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}