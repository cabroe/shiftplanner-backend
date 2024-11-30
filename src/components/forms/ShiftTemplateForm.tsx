import { useState, useEffect } from "react"
import { ShiftTemplate, Employee } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "./shared/FormField"
import { ColorSelect } from "./shared/ColorSelect"
import { ShiftTypeSelect } from "./shared/ShiftTypeSelect"
import { EmployeeSelect } from "./shared/EmployeeSelect"
import { WeekdayShifts } from "@/components/shift-templates/WeekdayShifts"
import { postApi, putApi } from "@/lib/api"

interface ShiftTemplateFormProps {
  shiftTemplate?: ShiftTemplate | null
  onSubmit: () => void
}

const WEEKDAYS = [
  { key: 'monday', label: 'Montag', day: 1 },
  { key: 'tuesday', label: 'Dienstag', day: 2 },
  { key: 'wednesday', label: 'Mittwoch', day: 3 },
  { key: 'thursday', label: 'Donnerstag', day: 4 },
  { key: 'friday', label: 'Freitag', day: 5 },
  { key: 'saturday', label: 'Samstag', day: 6 },
  { key: 'sunday', label: 'Sonntag', day: 0 }
] as const

const initialFormData: ShiftTemplate = {
  ID: 0,
  name: '',
  description: '',
  color: '#3b82f6',
  employee_ids: [],
  employees: [],
  monday: { shift_type_id: 0 },
  tuesday: { shift_type_id: 0 },
  wednesday: { shift_type_id: 0 },
  thursday: { shift_type_id: 0 },
  friday: { shift_type_id: 0 },
  saturday: { shift_type_id: 0 },
  sunday: { shift_type_id: 0 }
}

export function ShiftTemplateForm({ shiftTemplate, onSubmit }: ShiftTemplateFormProps) {
  const [formData, setFormData] = useState<ShiftTemplate>(initialFormData)

  useEffect(() => {
    if (shiftTemplate) {
      setFormData(shiftTemplate)
    } else {
      setFormData(initialFormData)
    }
  }, [shiftTemplate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Transform the data to match the API format
      const shifts = WEEKDAYS.map(({ day, key }) => ({
        day,
        shift_type_id: (formData[key as keyof typeof formData] as any).shift_type_id
      })).filter(shift => shift.shift_type_id !== 0)

      const submitData = {
        name: formData.name,
        description: formData.description,
        color: formData.color,
        shifts
      }

      if (shiftTemplate?.ID) {
        await putApi(`shifttemplates/${shiftTemplate.ID}`, submitData)
      } else {
        await postApi('shifttemplates', submitData)
      }
      onSubmit()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleEmployeeChange = (employees: Employee[]) => {
    setFormData({
      ...formData,
      employee_ids: employees.map(emp => emp.ID),
      employees
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="mb-2 font-medium">Vorschau</div>
        <div 
          className="p-3 rounded-md"
          style={{ backgroundColor: formData.color }}
        >
          <div className="text-white font-medium">
            {formData.name || 'Neue Vorlage'}
          </div>
          <div className="mt-2">
            <WeekdayShifts template={formData} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <FormField label="Name" required>
          <Input
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
        </FormField>

        <FormField label="Beschreibung">
          <Textarea
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </FormField>

        <FormField label="Mitarbeiter">
          <EmployeeSelect
            value={formData.employees}
            onChange={handleEmployeeChange}
          />
        </FormField>

        <FormField label="Farbe" required>
          <ColorSelect
            value={formData.color}
            onChange={value => setFormData({...formData, color: value})}
            required
          />
        </FormField>

        <div className="space-y-4">
          <div className="font-medium">Wochenplan</div>
          {WEEKDAYS.map(({ key, label }) => (
            <FormField key={key} label={label}>
              <ShiftTypeSelect
                value={(formData[key as keyof typeof formData] as any).shift_type_id}
                onChange={value => setFormData({
                  ...formData,
                  [key]: { 
                    shift_type_id: value,
                    shift_type: undefined // Clear cached shift type data
                  }
                })}
              />
            </FormField>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full">
        {shiftTemplate?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}