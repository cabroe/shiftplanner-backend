import { Department, Employee, ShiftType, ShiftTemplate } from '@/types'

export const mockDepartments: Department[] = [
  {
    ID: 1,
    name: "Produktion",
    description: "Produktionsabteilung",
    color: "#3b82f6",
    employees: []
  },
  {
    ID: 2,
    name: "Logistik",
    description: "Logistikabteilung",
    color: "#10b981",
    employees: []
  },
  {
    ID: 3,
    name: "Verwaltung",
    description: "Verwaltungsabteilung",
    color: "#8b5cf6",
    employees: []
  },
  {
    ID: 4,
    name: "Service",
    description: "Serviceabteilung",
    color: "#f59e0b",
    employees: []
  }
]

export const mockEmployees: Employee[] = [
  {
    ID: 1,
    first_name: "Max",
    last_name: "Mustermann",
    email: "max.mustermann@firma.de",
    department_id: 1,
    color: "#ef4444",
    department: mockDepartments[0]
  },
  {
    ID: 2,
    first_name: "Anna",
    last_name: "Schmidt",
    email: "anna.schmidt@firma.de",
    department_id: 1,
    color: "#f97316",
    department: mockDepartments[0]
  },
  {
    ID: 3,
    first_name: "Peter",
    last_name: "Weber",
    email: "peter.weber@firma.de",
    department_id: 2,
    color: "#84cc16",
    department: mockDepartments[1]
  },
  {
    ID: 4,
    first_name: "Sarah",
    last_name: "Meyer",
    email: "sarah.meyer@firma.de",
    department_id: 2,
    color: "#06b6d4",
    department: mockDepartments[1]
  },
  {
    ID: 5,
    first_name: "Michael",
    last_name: "Wagner",
    email: "michael.wagner@firma.de",
    department_id: 3,
    color: "#8b5cf6",
    department: mockDepartments[2]
  },
  {
    ID: 6,
    first_name: "Julia",
    last_name: "Becker",
    email: "julia.becker@firma.de",
    department_id: 3,
    color: "#ec4899",
    department: mockDepartments[2]
  },
  {
    ID: 7,
    first_name: "Thomas",
    last_name: "Koch",
    email: "thomas.koch@firma.de",
    department_id: 4,
    color: "#f43f5e",
    department: mockDepartments[3]
  },
  {
    ID: 8,
    first_name: "Lisa",
    last_name: "Fischer",
    email: "lisa.fischer@firma.de",
    department_id: 4,
    color: "#0ea5e9",
    department: mockDepartments[3]
  }
]

export const mockShiftTypes: ShiftType[] = [
  {
    ID: 1,
    name: "Frühschicht",
    description: "Reguläre Frühschicht",
    start_time: "06:00",
    end_time: "14:00",
    color: "#3b82f6"
  },
  {
    ID: 2,
    name: "Spätschicht",
    description: "Reguläre Spätschicht",
    start_time: "14:00",
    end_time: "22:00",
    color: "#10b981"
  },
  {
    ID: 3,
    name: "Nachtschicht",
    description: "Reguläre Nachtschicht",
    start_time: "22:00",
    end_time: "06:00",
    color: "#8b5cf6"
  },
  {
    ID: 4,
    name: "Tagschicht",
    description: "Reguläre Tagschicht",
    start_time: "08:00",
    end_time: "16:00",
    color: "#f59e0b"
  },
  {
    ID: 5,
    name: "Bereitschaft",
    description: "Bereitschaftsdienst",
    start_time: "00:00",
    end_time: "23:59",
    color: "#ef4444"
  }
]

export const mockShiftTemplates: ShiftTemplate[] = [
  {
    ID: 1,
    name: "Produktion Früh",
    description: "Frühschicht-Vorlage für Produktion",
    color: "#3b82f6",
    employee_ids: [1, 2],
    employees: [mockEmployees[0], mockEmployees[1]],
    monday: { shift_type_id: 1, shift_type: mockShiftTypes[0] },
    tuesday: { shift_type_id: 1, shift_type: mockShiftTypes[0] },
    wednesday: { shift_type_id: 1, shift_type: mockShiftTypes[0] },
    thursday: { shift_type_id: 1, shift_type: mockShiftTypes[0] },
    friday: { shift_type_id: 1, shift_type: mockShiftTypes[0] },
    saturday: { shift_type_id: 0 },
    sunday: { shift_type_id: 0 }
  },
  {
    ID: 2,
    name: "Logistik Spät",
    description: "Spätschicht-Vorlage für Logistik",
    color: "#10b981",
    employee_ids: [3, 4],
    employees: [mockEmployees[2], mockEmployees[3]],
    monday: { shift_type_id: 2, shift_type: mockShiftTypes[1] },
    tuesday: { shift_type_id: 2, shift_type: mockShiftTypes[1] },
    wednesday: { shift_type_id: 2, shift_type: mockShiftTypes[1] },
    thursday: { shift_type_id: 2, shift_type: mockShiftTypes[1] },
    friday: { shift_type_id: 2, shift_type: mockShiftTypes[1] },
    saturday: { shift_type_id: 0 },
    sunday: { shift_type_id: 0 }
  },
  {
    ID: 3,
    name: "Service Wochenende",
    description: "Wochenend-Vorlage für Service",
    color: "#f59e0b",
    employee_ids: [7, 8],
    employees: [mockEmployees[6], mockEmployees[7]],
    monday: { shift_type_id: 0 },
    tuesday: { shift_type_id: 0 },
    wednesday: { shift_type_id: 0 },
    thursday: { shift_type_id: 0 },
    friday: { shift_type_id: 0 },
    saturday: { shift_type_id: 4, shift_type: mockShiftTypes[3] },
    sunday: { shift_type_id: 4, shift_type: mockShiftTypes[3] }
  }
]

// Update department employees
mockDepartments.forEach(dept => {
  dept.employees = mockEmployees.filter(emp => emp.department_id === dept.ID)
})