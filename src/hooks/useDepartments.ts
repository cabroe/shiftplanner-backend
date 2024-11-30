import { useState, useEffect } from 'react'
import { Department } from '@/types'
import { fetchApi, deleteApi } from '@/lib/api'

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDepartments = async () => {
    try {
      setIsLoading(true)
      const data = await fetchApi<Department[]>('departments')
      setDepartments(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch departments'))
    } finally {
      setIsLoading(false)
    }
  }

  const deleteDepartment = async (id: number) => {
    await deleteApi(`departments/${id}`)
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  return {
    departments,
    isLoading,
    error,
    deleteDepartment,
    refreshDepartments: fetchDepartments
  }
}