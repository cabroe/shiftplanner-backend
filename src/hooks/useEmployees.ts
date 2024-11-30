import { useState, useEffect } from 'react'
import { Employee } from '@/types'
import { fetchApi, deleteApi } from '@/lib/api'

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchEmployees = async () => {
    try {
      setIsLoading(true)
      const data = await fetchApi<Employee[]>('employees')
      setEmployees(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch employees'))
    } finally {
      setIsLoading(false)
    }
  }

  const deleteEmployee = async (id: number) => {
    await deleteApi(`employees/${id}`)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return {
    employees,
    isLoading,
    error,
    deleteEmployee,
    refreshEmployees: fetchEmployees
  }
}