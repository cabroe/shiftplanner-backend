import { LoadingSpinner } from "./LoadingSpinner"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Laden..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  )
}