import { Employee } from "@/types"

interface EmployeeListProps {
  employees: Employee[]
  filteredEmployees: Employee[]
  searchQuery: string
}

export function EmployeeList({ employees, filteredEmployees, searchQuery }: EmployeeListProps) {
  const displayEmployees = searchQuery ? filteredEmployees : employees

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-[60px] p-4 font-medium border-b bg-muted/30 flex items-center justify-between">
        <span>Mitarbeiter</span>
        <span className="text-sm text-muted-foreground">
          {displayEmployees.length} von {employees.length}
        </span>
      </div>
      <div className="overflow-y-auto">
        {displayEmployees.map(employee => (
          <div 
            key={employee.ID} 
            className="h-[100px] p-4 flex items-center gap-2 border-b last:border-b-0"
          >
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: employee.color }}
            />
            <div className="truncate">
              {employee.first_name} {employee.last_name}
            </div>
          </div>
        ))}
        {displayEmployees.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            Keine Mitarbeiter gefunden
          </div>
        )}
      </div>
    </div>
  )
}