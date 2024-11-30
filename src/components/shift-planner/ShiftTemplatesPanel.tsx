import { Button } from "@/components/ui/button"
import { ShiftType, ShiftTemplate } from "@/types"
import { Pencil } from "lucide-react"

interface ShiftTemplatesPanelProps {
  shiftTypes: ShiftType[]
  shiftTemplates: ShiftTemplate[]
  onDragStart: (e: React.DragEvent, item: ShiftType | ShiftTemplate) => void
  onEditTemplate: (template: ShiftTemplate) => void
}

export function ShiftTemplatesPanel({ 
  shiftTypes, 
  shiftTemplates, 
  onDragStart,
  onEditTemplate 
}: ShiftTemplatesPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 font-medium border-b bg-muted/30">
        Schichtvorlagen
      </div>
      <div className="p-4 space-y-6 overflow-auto">
        {/* Shift Types */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Schichttypen</h3>
          {shiftTypes.map(shiftType => (
            <div
              key={shiftType.ID}
              className="p-3 rounded-md cursor-move transition-transform active:scale-95"
              style={{ 
                backgroundColor: shiftType.color,
                opacity: 0.9
              }}
              draggable="true"
              onDragStart={(e) => onDragStart(e, shiftType)}
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

        {/* Templates */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Vorlagen</h3>
          {shiftTemplates.map(template => (
            <div
              key={template.ID}
              className="p-3 rounded-md cursor-move border group relative transition-transform active:scale-95"
              style={{ 
                backgroundColor: template.color,
                opacity: 0.9
              }}
              draggable="true"
              onDragStart={(e) => onDragStart(e, template)}
            >
              <div className="text-white font-medium">
                {template.name}
                <div className="text-sm opacity-90">
                  {template.employees?.length || 0} Mitarbeiter
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEditTemplate(template)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}