import { useEffect, useState, useMemo } from "react"
import { Employee, ShiftType, ShiftTemplate } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShiftTemplateForm } from "@/components/forms/ShiftTemplateForm"
import { startOfWeek, addDays, format } from "date-fns"
import { ShiftPlannerHeader } from "@/components/shift-planner/ShiftPlannerHeader"
import { EmployeeList } from "@/components/shift-planner/EmployeeList"
import { ShiftGrid } from "@/components/shift-planner/ShiftGrid"
import { ShiftTemplatesPanel } from "@/components/shift-planner/ShiftTemplatesPanel"
import { useEmployees } from "@/hooks/useEmployees"
import { useShiftTypes } from "@/hooks/useShiftTypes"
import { useShiftTemplates } from "@/hooks/useShiftTemplates"
import { useShiftPlanner } from "@/hooks/useShiftPlanner"

export default function ShiftPlannerPage() {
  const { employees } = useEmployees()
  const { shiftTypes } = useShiftTypes()
  const { shiftTemplates } = useShiftTemplates()
  const { assignments, addAssignment, removeAssignment } = useShiftPlanner()
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedTemplate, setSelectedTemplate] = useState<ShiftTemplate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [draggedItem, setDraggedItem] = useState<ShiftType | ShiftTemplate | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const weekDays = useMemo(() => {
    const days = []
    const start = startOfWeek(currentDate, { weekStartsOn: 1 })
    
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i))
    }
    return days
  }, [currentDate])

  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees
    
    const query = searchQuery.toLowerCase()
    return employees.filter(employee => 
      employee.first_name.toLowerCase().includes(query) ||
      employee.last_name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.department?.name?.toLowerCase().includes(query)
    )
  }, [employees, searchQuery])

  const handleDragStart = (e: React.DragEvent, item: ShiftType | ShiftTemplate) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
    setDraggedItem(item)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    const target = e.target as HTMLElement
    if (target.classList.contains('shift-cell')) {
      target.classList.add('bg-primary/10')
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('shift-cell')) {
      target.classList.remove('bg-primary/10')
    }
  }

  const handleDrop = (e: React.DragEvent, employeeId: number, date: Date) => {
    e.preventDefault()
    const target = e.target as HTMLElement
    target.classList.remove('bg-primary/10')
    
    if (!draggedItem) return

    const dateStr = format(date, 'yyyy-MM-dd')
    addAssignment(employeeId, dateStr, draggedItem)
    setDraggedItem(null)
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <ShiftPlannerHeader 
        currentDate={currentDate}
        weekDays={weekDays}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDateChange={setCurrentDate}
        employees={employees}
        onEmployeeSelect={(employee) => {
          setSearchQuery(`${employee.first_name} ${employee.last_name}`)
        }}
      />

      <div className="grid grid-cols-[250px_1fr_300px] gap-4 min-h-0 flex-1">
        <EmployeeList 
          employees={employees}
          filteredEmployees={filteredEmployees}
          searchQuery={searchQuery}
        />

        <ShiftGrid 
          weekDays={weekDays}
          employees={filteredEmployees}
          assignments={assignments}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onRemoveShift={removeAssignment}
        />

        <ShiftTemplatesPanel 
          shiftTypes={shiftTypes}
          shiftTemplates={shiftTemplates}
          onDragStart={handleDragStart}
          onEditTemplate={(template) => {
            setSelectedTemplate(template)
            setIsDialogOpen(true)
          }}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schichtvorlage bearbeiten
            </DialogTitle>
          </DialogHeader>
          <ShiftTemplateForm 
            shiftTemplate={selectedTemplate} 
            onSubmit={() => {
              setIsDialogOpen(false)
              setSelectedTemplate(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}