import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  description?: string
}

export function FormField({ label, required, children, description }: FormFieldProps) {
  return (
    <div className="grid w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}