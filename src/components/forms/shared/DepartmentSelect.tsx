import { useDepartments } from "@/hooks/useDepartments"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DepartmentSelectProps {
  value: number
  onChange: (value: number) => void
  required?: boolean
}

export function DepartmentSelect({ value, onChange, required }: DepartmentSelectProps) {
  const { departments } = useDepartments()

  return (
    <Select
      value={value ? value.toString() : ""}
      onValueChange={value => onChange(parseInt(value))}
      required={required}
    >
      <SelectTrigger>
        <SelectValue placeholder="Abteilung wählen">
          {departments.find(d => d.ID === value)?.name || "Abteilung wählen"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {departments.map(department => (
          <SelectItem 
            key={department.ID} 
            value={department.ID.toString()}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: department.color }}
              />
              {department.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}