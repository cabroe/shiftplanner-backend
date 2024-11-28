import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Employee, ShiftType } from "@/types"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const ShiftPlannerPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const loadData = async () => {
      const [empResponse, shiftResponse] = await Promise.all([
        fetch(`${API_URL}/api/employees`),
        fetch(`${API_URL}/api/shifttypes`)
      ])
      const [empData, shiftData] = await Promise.all([
        empResponse.json(),
        shiftResponse.json()
      ])
      setEmployees(empData.data)
      setShiftTypes(shiftData.data)
    }
    loadData()
  }, [])

  const getDaysInMonth = () => {
    const days = []
    const startDate = new Date(currentDate)
    
    // Auf Montag zurücksetzen
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() - 1)
    }
    
    // 28 Tage (4 komplette Wochen) generieren
    for (let i = 0; i < 28; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold mb-8">Schichtplan</h1>
      
      <div className="grid grid-cols-[200px_1fr_250px] gap-4">
        {/* Mitarbeiterspalte */}
        <div>
          <div className="h-10 font-bold sticky top-0 bg-gray-100">Mitarbeiter</div>
          {employees.map(employee => (
            <div 
              key={employee.ID} 
              className="h-16 flex items-center p-2"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: employee.color }}
                />
                {employee.first_name} {employee.last_name}
              </div>
            </div>
          ))}
        </div>

        {/* Schichtplan-Tabelle */}
        <div>
          <Table className="border w-full table-fixed">
            <TableHeader>
              <TableRow>
                {getDaysInMonth().map(date => (
                  <TableHead 
                    key={date.toISOString()} 
                    className={`text-center h-10 sticky top-0 bg-white ${
                      date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-50' : ''
                    }`}
                  >
                    {date.toLocaleDateString('de-DE', { 
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(employee => (
                <TableRow key={employee.ID}>
                  {getDaysInMonth().map(date => (
                    <TableCell 
                      key={`${employee.ID}-${date.toISOString()}`}
                      className={`h-16 p-1 ${
                        date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div 
                        className="h-full rounded border-2 border-dashed border-gray-200 
                                 hover:border-primary hover:bg-primary/5 transition-colors
                                 flex items-center justify-center"
                      >
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Schichtvorlagen Widget */}
        <div className="flex flex-col">
          <div className="h-10 font-bold sticky top-0 bg-gray-100">Schichtvorlagen</div>
          <div className="space-y-2 sticky top-10">
            {shiftTypes.map(shiftType => (
              <div
                key={shiftType.ID}
                className="h-16 p-2 rounded cursor-move"
                style={{ 
                  backgroundColor: shiftType.color,
                  opacity: 0.9
                }}
                draggable="true"
              >
                <div className="text-white font-medium">
                  {shiftType.name}
                  <div className="text-sm opacity-90">
                    {shiftType.start_time} - {shiftType.end_time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShiftPlannerPage
