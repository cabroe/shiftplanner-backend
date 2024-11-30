import { useState, useEffect } from 'react'
import { ShiftType } from '@/types'
import { fetchApi, deleteApi } from '@/lib/api'

export function useShiftTypes() {
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchShiftTypes = async () => {
    try {
      setIsLoading(true)
      const data = await fetchApi<ShiftType[]>('shifttypes')
      setShiftTypes(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch shift types'))
    } finally {
      setIsLoading(false)
    }
  }

  const deleteShiftType = async (id: number) => {
    await deleteApi(`shifttypes/${id}`)
  }

  useEffect(() => {
    fetchShiftTypes()
  }, [])

  return {
    shiftTypes,
    isLoading,
    error,
    deleteShiftType,
    refreshShiftTypes: fetchShiftTypes
  }
}