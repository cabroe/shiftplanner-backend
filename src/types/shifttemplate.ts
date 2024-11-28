import { Employee } from './employee'
import { ShiftType } from './shifttype'

export interface ShiftTemplate {
  ID: number
  name: string
  description: string
  color: string
  employee_ids: number[]
  employees: Employee[]
  monday: ShiftDay
  tuesday: ShiftDay
  wednesday: ShiftDay
  thursday: ShiftDay
  friday: ShiftDay
  saturday: ShiftDay
  sunday: ShiftDay
}

export interface ShiftDay {
  shift_type_id: number
  shift_type: ShiftType
}