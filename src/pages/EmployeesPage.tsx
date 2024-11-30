import { useState } from "react"
import { Employee } from "@/types"
import { useEmployees } from "@/hooks/useEmployees"
import { PageHeader } from "@/components/shared/PageHeader"
import { DataTable } from "@/components/shared/DataTable"
import { ColorBadge } from "@/components/shared/ColorBadge"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EmployeeForm } from "@/components/forms/EmployeeForm"

export default function EmployeesPage() {
  const { employees, isLoading, deleteEmployee, refreshEmployees } = useEmployees()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null)

  const columns = [
    {
      header: "Name",
      accessor: (employee: Employee) => `${employee.first_name} ${employee.last_name}`
    },
    { header: "Email", accessor: "email" as const },
    { 
      header: "Abteilung", 
      accessor: (employee: Employee) => employee.department?.name || "-"
    },
    {
      header: "Farbe",
      accessor: (employee: Employee) => (
        <ColorBadge color={employee.color} />
      )
    }
  ]

  const handleDelete = async (employee: Employee) => {
    setEmployeeToDelete(employee)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (employeeToDelete) {
      await deleteEmployee(employeeToDelete.ID)
      refreshEmployees()
    }
  }

  return (
    <div className="container mx-auto py-10">
      <PageHeader 
        title="Mitarbeiter"
        onAdd={() => {
          setSelectedEmployee(null)
          setIsFormOpen(true)
        }}
        addButtonText="Neuer Mitarbeiter"
      />

      <DataTable
        data={employees}
        columns={columns}
        onEdit={(employee) => {
          setSelectedEmployee(employee)
          setIsFormOpen(true)
        }}
        onDelete={handleDelete}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEmployee ? 'Mitarbeiter bearbeiten' : 'Neuer Mitarbeiter'}
            </DialogTitle>
          </DialogHeader>
          <EmployeeForm 
            employee={selectedEmployee} 
            onSubmit={() => {
              setIsFormOpen(false)
              refreshEmployees()
            }}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Mitarbeiter löschen"
        description={`Möchten Sie den Mitarbeiter "${employeeToDelete?.first_name} ${employeeToDelete?.last_name}" wirklich löschen?`}
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  )
}