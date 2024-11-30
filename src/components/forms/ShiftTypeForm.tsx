import { useState, useEffect } from "react"
import { ShiftType } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "./shared/FormField"
import { ColorSelect } from "./shared/ColorSelect"
import { TimeSelect } from "./shared/TimeSelect"
import { ShiftTypeCard } from "@/components/shift-types/ShiftTypeCard"
import { postApi, putApi } from "@/lib/api"

interface ShiftTypeFormProps {
  shiftType?: ShiftType | null
  onSubmit: () => void
}

const initialFormData: ShiftType = {
  ID: 0,
  name: '',
  description: '',
  start_time: '',
  end_time: '',
  color: '#3b82f6'
}

export function ShiftTypeForm({ shiftType, onSubmit }: ShiftTypeFormProps) {
  const [formData, setFormData] = useState<ShiftType>(initialFormData)

  useEffect(() => {
    if (shiftType) {
      setFormData(shiftType)
    }
  }, [shiftType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (shiftType?.ID) {
        await putApi(`shifttypes/${shiftType.ID}`, formData)
      } else {
        await postApi('shifttypes', formData)
      }
      onSubmit()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ShiftTypeCard 
        shiftType={formData} 
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
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Startzeit" required>
            <TimeSelect
              value={formData.start_time}
              onChange={value => setFormData({...formData, start_time: value})}
              required
            />
          </FormField>

          <FormField label="Endzeit" required>
            <TimeSelect
              value={formData.end_time}
              onChange={value => setFormData({...formData, end_time: value})}
              required
            />
          </FormField>
        </div>

        <FormField label="Farbe" required>
          <ColorSelect
            value={formData.color}
            onChange={value => setFormData({...formData, color: value})}
            required
          />
        </FormField>
      </div>

      <Button type="submit" className="w-full">
        {shiftType?.ID ? 'Aktualisieren' : 'Erstellen'}
      </Button>
    </form>
  )
}