import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Employee, ShiftType } from "@/types"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { ShiftCell } from "./ShiftCell"
import { useShiftTypes } from "@/hooks/useShiftTypes"

interface ShiftGridProps {
  weekDays: Date[]
  employees: Employee[]
  assignments: {
    employeeId: number
    date: string
    shiftTypeId: number
  }[]
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, employeeId: number, date: Date) => void
  onRemoveShift: (employeeId: number, date: string) => void
}

export function ShiftGrid({ 
  weekDays, 
  employees, 
  assignments,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveShift
}: ShiftGridProps) {
  const { shiftTypes } = useShiftTypes()

  const getShiftType = (employeeId: number, date: Date): ShiftType | undefined => {
    const assignment = assignments.find(
      a => a.employeeId === employeeId && a.date === format(date, 'yyyy-MM-dd')
    )
    if (!assignment) return undefined
    return shiftTypes.find(t => t.ID === assignment.shiftTypeId)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {weekDays.map(date => (
                <TableHead 
                  key={date.toISOString()}
                  className="h-[60px] border-b text-center w-[180px]"
                >
                  <div className="font-medium">
                    {format(date, 'EEEE', { locale: de })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(date, 'dd.MM.yyyy')}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map(employee => (
              <TableRow key={employee.ID}>
                {weekDays.map(date => {
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6
                  const shiftType = getShiftType(employee.ID, date)
                  const dateStr = format(date, 'yyyy-MM-dd')

                  return (
                    <TableCell 
                      key={`${employee.ID}-${date.toISOString()}`}
                      className="p-0 h-[100px] border-b last:border-b-0 relative"
                    >
                      <ShiftCell
                        shiftType={shiftType}
                        isWeekend={isWeekend}
                        onRemove={shiftType ? () => onRemoveShift(employee.ID, dateStr) : undefined}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={(e) => onDrop(e, employee.ID, date)}
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}