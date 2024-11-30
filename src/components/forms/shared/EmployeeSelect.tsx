import { useEmployees } from "@/hooks/useEmployees"
import { Employee } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"

interface EmployeeSelectProps {
  value: Employee[]
  onChange: (value: Employee[]) => void
  required?: boolean
}

export function EmployeeSelect({ value, onChange, required }: EmployeeSelectProps) {
  const { employees } = useEmployees()

  const handleSelect = (selectedId: string) => {
    const id = parseInt(selectedId)
    const employee = employees.find(emp => emp.ID === id)
    if (!employee) return

    const isSelected = value.some(emp => emp.ID === id)
    const newValue = isSelected
      ? value.filter(emp => emp.ID !== id)
      : [...value, employee]

    onChange(newValue)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {value.map(emp => (
          <div 
            key={emp.ID}
            className="bg-muted rounded-full px-2 py-1 text-sm flex items-center gap-1"
          >
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: emp.color }}
            />
            {emp.first_name} {emp.last_name}
          </div>
        ))}
      </div>

      <Select
        value=""
        onValueChange={handleSelect}
      >
        <SelectTrigger>
          <SelectValue placeholder="Mitarbeiter auswählen" />
        </SelectTrigger>
        <SelectContent>
          {employees.map(emp => (
            <SelectItem 
              key={emp.ID} 
              value={emp.ID.toString()}
            >
              <div className="flex items-center gap-2 w-full">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: emp.color }}
                />
                <span>{emp.first_name} {emp.last_name}</span>
                {value.some(e => e.ID === emp.ID) && (
                  <Check className="w-4 h-4 ml-auto" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}