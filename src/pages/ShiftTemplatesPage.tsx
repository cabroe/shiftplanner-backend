import { useState } from "react"
import { ShiftTemplate } from "@/types"
import { useShiftTemplates } from "@/hooks/useShiftTemplates"
import { PageHeader } from "@/components/shared/PageHeader"
import { DataTable } from "@/components/shared/DataTable"
import { ColorBadge } from "@/components/shared/ColorBadge"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShiftTemplateForm } from "@/components/forms/ShiftTemplateForm"
import { WeekdayShifts } from "@/components/shift-templates/WeekdayShifts"
import { useDialog } from "@/lib/hooks/useDialog"
import { useConfirmDialog } from "@/lib/hooks/useConfirmDialog"

export default function ShiftTemplatesPage() {
  const { shiftTemplates, isLoading, deleteShiftTemplate, refreshShiftTemplates } = useShiftTemplates()
  const formDialog = useDialog<ShiftTemplate>()
  const confirmDialog = useConfirmDialog<ShiftTemplate>()

  const handleDelete = (template: ShiftTemplate) => {
    confirmDialog.open(template, async () => {
      await deleteShiftTemplate(template.ID)
      refreshShiftTemplates()
    })
  }

  const handleFormSubmit = () => {
    formDialog.close()
    refreshShiftTemplates()
  }

  return (
    <div className="container mx-auto py-10">
      <PageHeader 
        title="Schichtvorlagen"
        onAdd={() => formDialog.open()}
        addButtonText="Neue Schichtvorlage"
      />

      <DataTable
        data={shiftTemplates}
        columns={[
          { header: "Name", accessor: "name" as const },
          { header: "Beschreibung", accessor: "description" as const },
          { 
            header: "Mitarbeiter", 
            accessor: (template: ShiftTemplate) => template.employees?.length || 0
          },
          {
            header: "Wochenplan",
            accessor: (template: ShiftTemplate) => (
              <WeekdayShifts template={template} />
            )
          },
          {
            header: "Farbe",
            accessor: (template: ShiftTemplate) => (
              <ColorBadge color={template.color} />
            )
          }
        ]}
        onEdit={(template) => formDialog.open(template)}
        onDelete={handleDelete}
      />

      {formDialog.isOpen && (
        <Dialog 
          open={formDialog.isOpen} 
          onOpenChange={formDialog.close}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {formDialog.data ? 'Schichtvorlage bearbeiten' : 'Neue Schichtvorlage'}
              </DialogTitle>
            </DialogHeader>
            <ShiftTemplateForm 
              key={formDialog.data?.ID || 'new'} 
              shiftTemplate={formDialog.data} 
              onSubmit={handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.close}
        title="Schichtvorlage löschen"
        description={`Möchten Sie die Schichtvorlage "${confirmDialog.data?.name}" wirklich löschen?`}
        onConfirm={confirmDialog.confirm}
        variant="destructive"
      />
    </div>
  )
}