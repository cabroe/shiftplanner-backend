import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  onAdd?: () => void
  addButtonText?: string
}

export function PageHeader({ 
  title, 
  description,
  onAdd, 
  addButtonText 
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
      {onAdd && (
        <Button onClick={onAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {addButtonText}
        </Button>
      )}
    </div>
  )
}