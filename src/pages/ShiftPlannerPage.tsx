import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Employee, ShiftType, ShiftTemplate } from "@/types"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShiftTemplateForm } from "@/components/forms/ShiftTemplateForm"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const ShiftPlannerPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])
  const [shiftTemplates, setShiftTemplates] = useState<ShiftTemplate[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedTemplate, setSelectedTemplate] = useState<ShiftTemplate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const loadData = async () => {
    const [empResponse, shiftResponse, templateResponse] = await Promise.all([
      fetch(`${API_URL}/api/employees`),
      fetch(`${API_URL}/api/shifttypes`),
      fetch(`${API_URL}/api/shifttemplates`)
    ])
    const [empData, shiftData, templateData] = await Promise.all([
      empResponse.json(),
      shiftResponse.json(),
      templateResponse.json()
    ])
    setEmployees(empData.data)
    setShiftTypes(shiftData.data)
    setShiftTemplates(templateData.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleEdit = (template: ShiftTemplate) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const getDaysInMonth = () => {
    const days = []
    const startDate = new Date(currentDate)
    
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() - 1)
    }
    
    for (let i = 0; i < 28; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  const handleDragStart = (e: React.DragEvent, item: ShiftType | ShiftTemplate) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
  }

  return (
    <div className="flex flex-col h-full">      
      <div className="grid grid-cols-[200px_minmax(0,1fr)_250px] gap-4 flex-1">
            {/* Mitarbeiterspalte */}
        <div>
          <div className="h-10 font-bold bg-gray-100 flex items-center px-2 border-b">
            Mitarbeiter
          </div>
          <div className="divide-y">
            {employees.map(employee => (
              <div 
                key={employee.ID} 
                className="h-16 flex items-center px-2"
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
        </div>

        {/* Schichtplan-Tabelle */}
        <div className="bg-white border rounded-lg">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                {getDaysInMonth().map(date => (
                  <TableHead 
                    key={date.toISOString()} 
                    className={`h-10 text-center bg-gray-100 ${
                      date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-50' : ''
                    }`}
                  >
                    {`${date.toLocaleDateString('de-DE', { weekday: 'short' }).slice(0, 2)} ${date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}`}
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
        <div className="bg-white border rounded-lg overflow-auto">
          <div className="h-10 font-bold bg-gray-100 flex items-center px-2 border-b sticky top-0">
            Schichtvorlagen
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {shiftTypes.map(shiftType => (
                <div
                  key={shiftType.ID}
                  className="h-16 p-2 rounded cursor-move"
                  style={{ 
                    backgroundColor: shiftType.color,
                    opacity: 0.9
                  }}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, shiftType)}
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

            <div className="space-y-2">
              <div className="font-medium">Vorlagen</div>
              {shiftTemplates.map(template => (
                <div
                  key={template.ID}
                  className="p-2 rounded cursor-move border group relative"
                  style={{ 
                    backgroundColor: template.color,
                    opacity: 0.9
                  }}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, template)}
                >
                  <div className="font-medium text-white">
                    {template.name}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                    onClick={() => handleEdit(template)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              loadData()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ShiftPlannerPage
