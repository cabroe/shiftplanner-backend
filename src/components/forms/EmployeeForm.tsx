import { useState, useEffect } from "react"
import { Employee } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "./shared/FormField"
import { ColorSelect } from "./shared/ColorSelect"
import { DepartmentSelect } from "./shared/DepartmentSelect"
import { EmployeeCard } from "@/components/employees/EmployeeCard"
import { postApi, putApi } from "@/lib/api"

interface EmployeeFormProps {
  employee?: Employee | null
  onSubmit: () => void
}

const initialFormData: Employee = {
  ID: 0,
  first_name: '',
  last_name: '',
  email: '',
  department_id: 0,
  color: '#3b82f6'
}

export function EmployeeForm({ employee, onSubmit }: EmployeeFormProps) {
  const [formData, setFormData] = useState<Employee>(initialFormData)

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        department_id: employee.department_id || 0
      })
    } else {
      setFormData(initialFormData)
    }
  }, [employee])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (employee?.ID) {
        await putApi(`employees/${employee.ID}`, formData)
      } else {
        await postApi('employees', formData)
      }
      onSubmit()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EmployeeCard 
        employee={formData} 
        className="bg-muted/50"
      />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Vorname" required>
            <Input
              value={formData.first_name}
              onChange={e => setFormData({...formData, first_name: e.target.value})}
              required
            />
          </FormField>

          <FormField label="Nachname" required>
            <Input
              value={formData.last_name}
              onChange={e => setFormData({...formData, last_name: e.target.value})}
              required
            />
          </FormField>
        </div>

        <FormField label="Email" required>
          <Input
            type="email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            required
          />
        </FormField>

        <FormField label="Abteilung" required>
          <DepartmentSelect
            value={formData.department_id}
            onChange={value => setFormData({
              ...formData, 
              department_id: value,
              department: undefined // Clear cached department data
            })}
            required
          />
        </FormField>

        <FormField label="Farbe" required>
          <ColorSelect
            value={formData.color}
            onChange={value => setFormData({...formData, color: value})}
            required
          />
        </FormField>
      </div>

      <Button type="submit" className="w-full">
        {employee?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}