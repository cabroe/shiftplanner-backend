import { LoadingState } from "./LoadingState"
import { ErrorMessage } from "./ErrorMessage"
import { EmptyState } from "./EmptyState"
import { DataTable } from "./DataTable"

interface DataTableWrapperProps<T> {
  data: T[]
  isLoading: boolean
  error: Error | null
  columns: any[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  emptyState: {
    title: string
    description: string
    action?: {
      label: string
      onClick: () => void
    }
  }
}

export function DataTableWrapper<T extends { ID: number }>({ 
  data,
  isLoading,
  error,
  columns,
  onEdit,
  onDelete,
  emptyState
}: DataTableWrapperProps<T>) {
  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  if (!data.length) {
    return <EmptyState {...emptyState} />
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}