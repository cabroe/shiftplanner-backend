import { useState, useEffect } from 'react'
import { ShiftTemplate } from '@/types'
import { fetchApi, deleteApi } from '@/lib/api'

export function useShiftTemplates() {
  const [shiftTemplates, setShiftTemplates] = useState<ShiftTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchShiftTemplates = async () => {
    try {
      setIsLoading(true)
      const data = await fetchApi<ShiftTemplate[]>('shifttemplates')
      setShiftTemplates(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch shift templates'))
    } finally {
      setIsLoading(false)
    }
  }

  const deleteShiftTemplate = async (id: number) => {
    await deleteApi(`shifttemplates/${id}`)
  }

  useEffect(() => {
    fetchShiftTemplates()
  }, [])

  return {
    shiftTemplates,
    isLoading,
    error,
    deleteShiftTemplate,
    refreshShiftTemplates: fetchShiftTemplates
  }
}