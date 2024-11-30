import { Department } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

interface DepartmentCardProps {
  department: Department
  className?: string
}

export function DepartmentCard({ department, className }: DepartmentCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: department.color }}
          >
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-medium">
              {department.name}
            </div>
            {department.description && (
              <div className="text-sm text-muted-foreground">
                {department.description}
              </div>
            )}
            {department.employees && (
              <div className="text-sm mt-1 flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                {department.employees.length} Mitarbeiter
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}