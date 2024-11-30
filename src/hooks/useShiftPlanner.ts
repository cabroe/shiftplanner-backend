import { useState } from 'react'
import { ShiftType, ShiftTemplate } from '@/types'

interface ShiftAssignment {
  employeeId: number
  date: string
  shiftTypeId: number
}

export function useShiftPlanner() {
  const [assignments, setAssignments] = useState<ShiftAssignment[]>([])

  const addAssignment = (employeeId: number, date: string, item: ShiftType | ShiftTemplate) => {
    if ('shift_type_id' in item) {
      // Handle ShiftTemplate
      const template = item
      const dayOfWeek = new Date(date).getDay()
      const dayMap: Record<number, keyof ShiftTemplate> = {
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday',
        0: 'sunday'
      }
      
      const day = dayMap[dayOfWeek]
      const shiftTypeId = template[day].shift_type_id

      if (shiftTypeId) {
        setAssignments(prev => [
          ...prev.filter(a => !(a.employeeId === employeeId && a.date === date)),
          { employeeId, date, shiftTypeId }
        ])
      }
    } else {
      // Handle ShiftType
      setAssignments(prev => [
        ...prev.filter(a => !(a.employeeId === employeeId && a.date === date)),
        { employeeId, date, shiftTypeId: item.ID }
      ])
    }
  }

  const getAssignment = (employeeId: number, date: string) => {
    return assignments.find(
      a => a.employeeId === employeeId && a.date === date
    )
  }

  const removeAssignment = (employeeId: number, date: string) => {
    setAssignments(prev => 
      prev.filter(a => !(a.employeeId === employeeId && a.date === date))
    )
  }

  return {
    assignments,
    addAssignment,
    getAssignment,
    removeAssignment
  }
}