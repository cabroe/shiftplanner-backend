import { useState } from "react"
import { ShiftType } from "@/types"
import { useShiftTypes } from "@/hooks/useShiftTypes"
import { PageHeader } from "@/components/shared/PageHeader"
import { DataTable } from "@/components/shared/DataTable"
import { ColorBadge } from "@/components/shared/ColorBadge"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShiftTypeForm } from "@/components/forms/ShiftTypeForm"
import { formatTime } from "@/lib/date"
import { ShiftTypeCard } from "@/components/shift-types/ShiftTypeCard"
import { useDialog } from "@/lib/hooks/useDialog"
import { useConfirmDialog } from "@/lib/hooks/useConfirmDialog"

export default function ShiftTypesPage() {
  const { shiftTypes, isLoading, deleteShiftType, refreshShiftTypes } = useShiftTypes()
  const formDialog = useDialog<ShiftType>()
  const confirmDialog = useConfirmDialog<ShiftType>()

  const handleDelete = (shiftType: ShiftType) => {
    confirmDialog.open(shiftType, async () => {
      await deleteShiftType(shiftType.ID)
      refreshShiftTypes()
    })
  }

  const handleFormSubmit = () => {
    formDialog.close()
    refreshShiftTypes()
  }

  return (
    <div className="container mx-auto py-10">
      <PageHeader 
        title="Schichttypen"
        description="Verwalten Sie die verschiedenen Arten von Schichten."
        onAdd={() => formDialog.open()}
        addButtonText="Neuer Schichttyp"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shiftTypes.map(shiftType => (
          <div 
            key={shiftType.ID}
            className="group relative cursor-pointer"
            onClick={() => formDialog.open(shiftType)}
          >
            <ShiftTypeCard 
              shiftType={shiftType}
              className="transition-transform hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>

      {formDialog.isOpen && (
        <Dialog 
          open={formDialog.isOpen} 
          onOpenChange={formDialog.close}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {formDialog.data ? 'Schichttyp bearbeiten' : 'Neuer Schichttyp'}
              </DialogTitle>
            </DialogHeader>
            <ShiftTypeForm 
              key={formDialog.data?.ID || 'new'} 
              shiftType={formDialog.data} 
              onSubmit={handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.close}
        title="Schichttyp löschen"
        description={`Möchten Sie den Schichttyp "${confirmDialog.data?.name}" wirklich löschen?`}
        onConfirm={confirmDialog.confirm}
        variant="destructive"
      />
    </div>
  )
}