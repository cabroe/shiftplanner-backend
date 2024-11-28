import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Employee, ShiftTemplate, ShiftType } from "@/types"
import { getColorOptions } from "@/lib/colors"
import { Check } from "lucide-react"

interface ShiftTemplateFormProps {
  shiftTemplate?: ShiftTemplate | null
  onSubmit: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const WEEKDAYS = [
  { key: 'monday', label: 'Montag' },
  { key: 'tuesday', label: 'Dienstag' },
  { key: 'wednesday', label: 'Mittwoch' },
  { key: 'thursday', label: 'Donnerstag' },
  { key: 'friday', label: 'Freitag' },
  { key: 'saturday', label: 'Samstag' },
  { key: 'sunday', label: 'Sonntag' }
]

export function ShiftTemplateForm({ shiftTemplate, onSubmit }: ShiftTemplateFormProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])
  const [formData, setFormData] = useState<ShiftTemplate>({
    ID: 0,
    name: '',
    description: '',
    color: getColorOptions()[0].value,
    employee_ids: [],
    employees: [],
    monday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    tuesday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    wednesday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    thursday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    friday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    saturday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } },
    sunday: { shift_type_id: 0, shift_type: { ID: 0, name: '', start_time: '', end_time: '', color: '' } }
  })

  useEffect(() => {
    const initializeForm = async () => {
      const [empResponse, typeResponse] = await Promise.all([
        fetch(`${API_URL}/api/employees`),
        fetch(`${API_URL}/api/shifttypes`)
      ])
      
      const [empData, typeData] = await Promise.all([
        empResponse.json(),
        typeResponse.json()
      ])
      
      setEmployees(empData.data)
      setShiftTypes(typeData.data)

      if (shiftTemplate?.ID) {
        const templateResponse = await fetch(`${API_URL}/api/shifttemplates/${shiftTemplate.ID}`)
        const templateData = await templateResponse.json()
        setFormData(templateData.data)
      }
    }

    initializeForm()
  }, [shiftTemplate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = {
      ...formData,
      employee_ids: formData.employee_ids,
      monday: { shift_type_id: Number(formData.monday.shift_type_id) },
      tuesday: { shift_type_id: Number(formData.tuesday.shift_type_id) },
      wednesday: { shift_type_id: Number(formData.wednesday.shift_type_id) },
      thursday: { shift_type_id: Number(formData.thursday.shift_type_id) },
      friday: { shift_type_id: Number(formData.friday.shift_type_id) },
      saturday: { shift_type_id: Number(formData.saturday.shift_type_id) },
      sunday: { shift_type_id: Number(formData.sunday.shift_type_id) }
    }
    
    const url = shiftTemplate?.ID 
      ? `${API_URL}/api/shifttemplates/${shiftTemplate.ID}`
      : `${API_URL}/api/shifttemplates`
    
    const response = await fetch(url, {
      method: shiftTemplate?.ID ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData)
    })

    if (response.ok) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="color">Farbe *</Label>
        <Select
          value={formData.color}
          onValueChange={value => setFormData({...formData, color: value})}
          required
        >
          <SelectTrigger>
            <SelectValue>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: formData.color }}
                />
                {getColorOptions().find(c => c.value === formData.color)?.label || "Farbe wählen"}
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
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="employees">Mitarbeiter</Label>
        <div className="flex flex-wrap gap-1 mb-2">
          {formData.employees.map(emp => (
            <div 
              key={emp.ID}
              className="bg-primary/10 rounded px-2 py-1 text-sm flex items-center gap-1"
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
          value={formData.employee_ids?.map(id => id.toString())[0] || ''}
          onValueChange={value => {
            const currentIds = formData.employee_ids || []
            const newIds = currentIds.includes(parseInt(value))
              ? currentIds.filter(id => id !== parseInt(value))
              : [...currentIds, parseInt(value)]
            
            const selectedEmployees = employees.filter(emp => 
              newIds.includes(emp.ID)
            )
            
            setFormData({
              ...formData,
              employee_ids: newIds,
              employees: selectedEmployees
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Mitarbeiter auswählen" />
          </SelectTrigger>
          <SelectContent>
            {employees.map(emp => (
              <SelectItem key={emp.ID} value={emp.ID.toString()}>
                <div className="flex items-center gap-2 w-full">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: emp.color }}
                  />
                  <span>{emp.first_name} {emp.last_name}</span>
                  {formData.employee_ids.includes(emp.ID) && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {WEEKDAYS.map(({ key, label }) => (
        <div key={key} className="grid w-full gap-2">
          <Label htmlFor={key}>{label} *</Label>
          <Select 
            value={(formData[key as keyof typeof formData] as { shift_type_id: number })?.shift_type_id?.toString()}
            onValueChange={value => {
              const selectedShiftType = shiftTypes.find(type => type.ID.toString() === value)
              setFormData({
                ...formData,
                [key]: { 
                  shift_type_id: parseInt(value),
                  shift_type: selectedShiftType
                }
              })
            }}
            required
          >
            <SelectTrigger>
              <SelectValue>
                {(formData[key as keyof typeof formData] as any)?.shift_type?.name || "Schichttyp auswählen"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {shiftTypes.map(type => (
                <SelectItem key={type.ID} value={type.ID.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <Button type="submit" className="w-full">
        {shiftTemplate?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}
