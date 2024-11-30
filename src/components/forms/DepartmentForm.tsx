import { useState, useEffect } from "react"
import { Department } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "./shared/FormField"
import { ColorSelect } from "./shared/ColorSelect"
import { DepartmentCard } from "@/components/departments/DepartmentCard"
import { postApi, putApi } from "@/lib/api"

interface DepartmentFormProps {
  department?: Department | null
  onSubmit: () => void
}

const initialFormData: Department = {
  ID: 0,
  name: '',
  description: '',
  color: '#3b82f6'
}

export function DepartmentForm({ department, onSubmit }: DepartmentFormProps) {
  const [formData, setFormData] = useState<Department>(initialFormData)

  useEffect(() => {
    if (department) {
      setFormData(department)
    }
  }, [department])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (department?.ID) {
        await putApi(`departments/${department.ID}`, formData)
      } else {
        await postApi('departments', formData)
      }
      onSubmit()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DepartmentCard 
        department={formData} 
        className="bg-muted/50"
      />

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
            placeholder="Optionale Beschreibung der Abteilung"
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
        {department?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}