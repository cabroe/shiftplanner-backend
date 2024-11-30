import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getColorOptions } from "@/lib/colors"

interface ColorSelectProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function ColorSelect({ value, onChange, required }: ColorSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      required={required}
    >
      <SelectTrigger>
        <SelectValue>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: value }}
            />
            {getColorOptions().find(c => c.value === value)?.label || "Farbe wählen"}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {getColorOptions().map(color => (
          <SelectItem key={color.value} value={color.value}>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: color.value }}
              />
              {color.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}