import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { addWeeks, subWeeks } from "date-fns"
import { Employee } from "@/types"
import { useState } from "react"

interface ShiftPlannerHeaderProps {
  currentDate: Date
  weekDays: Date[]
  searchQuery: string
  onSearchChange: (value: string) => void
  onDateChange: (date: Date) => void
  employees: Employee[]
  onEmployeeSelect?: (employee: Employee) => void
}

export function ShiftPlannerHeader({ 
  currentDate, 
  weekDays, 
  searchQuery,
  onSearchChange,
  onDateChange,
  employees,
  onEmployeeSelect
}: ShiftPlannerHeaderProps) {
  const [showResults, setShowResults] = useState(false)

  const filteredEmployees = employees.filter(employee => {
    const query = searchQuery.toLowerCase()
    return (
      employee.first_name.toLowerCase().includes(query) ||
      employee.last_name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.department?.name?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDateChange(subWeeks(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDateChange(addWeeks(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {format(weekDays[0], 'dd. MMMM', { locale: de })} - {format(weekDays[6], 'dd. MMMM yyyy', { locale: de })}
            </span>
          </div>
        </div>

        <div className="relative search-container w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Mitarbeiter suchen..."
            className="pl-9 pr-8"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value)
              setShowResults(true)
            }}
            onFocus={() => setShowResults(true)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => {
                onSearchChange('')
                setShowResults(false)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {showResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border shadow-lg max-h-[300px] overflow-auto z-50">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(employee => (
                  <div
                    key={employee.ID}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => {
                      if (onEmployeeSelect) {
                        onEmployeeSelect(employee)
                      }
                      setShowResults(false)
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                      style={{ backgroundColor: employee.color }}
                    >
                      {employee.first_name[0]}{employee.last_name[0]}
                    </div>
                    <div>
                      <div className="font-medium">
                        {employee.first_name} {employee.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {employee.email}
                      </div>
                      {employee.department && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: employee.department.color }}
                          />
                          {employee.department.name}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-sm text-muted-foreground text-center">
                  Keine Ergebnisse gefunden
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline"
          onClick={() => onDateChange(new Date())}
        >
          Heute
        </Button>
        <Button>Speichern</Button>
      </div>
    </div>
  )
}