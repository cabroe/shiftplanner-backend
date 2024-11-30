import { useState } from "react"
import { Department } from "@/types"
import { useDepartments } from "@/hooks/useDepartments"
import { PageHeader } from "@/components/shared/PageHeader"
import { DataTable } from "@/components/shared/DataTable"
import { ColorBadge } from "@/components/shared/ColorBadge"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DepartmentForm } from "@/components/forms/DepartmentForm"

export default function DepartmentsPage() {
  const { departments, isLoading, deleteDepartment, refreshDepartments } = useDepartments()
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null)

  const columns = [
    { header: "Name", accessor: "name" as const },
    { header: "Beschreibung", accessor: "description" as const },
    { 
      header: "Mitarbeiter", 
      accessor: (department: Department) => department.employees?.length || 0
    },
    {
      header: "Farbe",
      accessor: (department: Department) => (
        <ColorBadge color={department.color} />
      )
    }
  ]

  const handleDelete = async (department: Department) => {
    setDepartmentToDelete(department)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (departmentToDelete) {
      await deleteDepartment(departmentToDelete.ID)
      refreshDepartments()
    }
  }

  return (
    <div className="container mx-auto py-10">
      <PageHeader 
        title="Abteilungen"
        onAdd={() => {
          setSelectedDepartment(null)
          setIsFormOpen(true)
        }}
        addButtonText="Neue Abteilung"
      />

      <DataTable
        data={departments}
        columns={columns}
        onEdit={(department) => {
          setSelectedDepartment(department)
          setIsFormOpen(true)
        }}
        onDelete={handleDelete}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDepartment ? 'Abteilung bearbeiten' : 'Neue Abteilung'}
            </DialogTitle>
          </DialogHeader>
          <DepartmentForm 
            department={selectedDepartment} 
            onSubmit={() => {
              setIsFormOpen(false)
              refreshDepartments()
            }}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Abteilung löschen"
        description={`Möchten Sie die Abteilung "${departmentToDelete?.name}" wirklich löschen?`}
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  )
}