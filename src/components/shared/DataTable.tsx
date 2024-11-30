import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

export function DataTable<T extends { ID: number }>({ 
  data, 
  columns,
  onEdit,
  onDelete
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead 
              key={index}
              className={column.className}
            >
              {column.header}
            </TableHead>
          ))}
          {(onEdit || onDelete) && (
            <TableHead className="w-[100px]">Aktionen</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.ID}>
            {columns.map((column, index) => (
              <TableCell key={index}>
                {typeof column.accessor === 'function'
                  ? column.accessor(item)
                  : item[column.accessor]}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell>
                <div className="flex gap-2">
                  {onEdit && (
                    <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}