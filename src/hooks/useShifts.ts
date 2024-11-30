import { useState, useEffect } from 'react'
import { Shift, getShifts, createShift, updateShift, deleteShift } from '@/lib/api/shifts'

export function useShifts(params?: {
  start_date?: Date
  end_date?: Date
  employee_id?: number
}) {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchShifts = async () => {
    try {
      setIsLoading(true)
      const response = await getShifts(params)
      setShifts(response.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch shifts'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchShifts()
  }, [params?.start_date, params?.end_date, params?.employee_id])

  const addShift = async (shift: Omit<Shift, 'ID'>) => {
    try {
      await createShift(shift)
      await fetchShifts()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create shift')
    }
  }

  const editShift = async (id: number, shift: Partial<Shift>) => {
    try {
      await updateShift(id, shift)
      await fetchShifts()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update shift')
    }
  }

  const removeShift = async (id: number) => {
    try {
      await deleteShift(id)
      await fetchShifts()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete shift')
    }
  }

  return {
    shifts,
    isLoading,
    error,
    addShift,
    editShift,
    removeShift,
    refreshShifts: fetchShifts
  }
}