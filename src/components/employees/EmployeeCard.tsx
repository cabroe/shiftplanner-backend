import { Employee } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { useDepartments } from "@/hooks/useDepartments"

interface EmployeeCardProps {
  employee: Employee
  className?: string
}

export function EmployeeCard({ employee, className }: EmployeeCardProps) {
  const { departments } = useDepartments()
  const department = departments.find(d => d.ID === employee.department_id)

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: employee.color }}
          >
            {employee.first_name?.[0]}{employee.last_name?.[0]}
          </div>
          <div>
            <div className="font-medium">
              {employee.first_name} {employee.last_name}
            </div>
            <div className="text-sm text-muted-foreground">
              {employee.email}
            </div>
            {department && (
              <div className="text-sm mt-1 flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: department.color }}
                />
                {department.name}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}