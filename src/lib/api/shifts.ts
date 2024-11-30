import { format } from 'date-fns'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export interface Shift {
  ID: number
  employee_id: number
  shift_type_id: number
  start_time: string
  end_time: string
  description?: string
}

export async function getShifts(params?: {
  start_date?: Date
  end_date?: Date
  employee_id?: number
}) {
  let url = `${API_URL}/api/shifts`
  const queryParams = new URLSearchParams()

  if (params?.start_date) {
    queryParams.append('start_date', format(params.start_date, 'yyyy-MM-dd'))
  }
  if (params?.end_date) {
    queryParams.append('end_date', format(params.end_date, 'yyyy-MM-dd'))
  }
  if (params?.employee_id) {
    queryParams.append('employee_id', params.employee_id.toString())
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch shifts')
  }
  return response.json()
}

export async function getShift(id: number) {
  const response = await fetch(`${API_URL}/api/shifts/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch shift')
  }
  return response.json()
}

export async function createShift(shift: Omit<Shift, 'ID'>) {
  const response = await fetch(`${API_URL}/api/shifts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shift),
  })
  if (!response.ok) {
    throw new Error('Failed to create shift')
  }
  return response.json()
}

export async function updateShift(id: number, shift: Partial<Shift>) {
  const response = await fetch(`${API_URL}/api/shifts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shift),
  })
  if (!response.ok) {
    throw new Error('Failed to update shift')
  }
  return response.json()
}

export async function deleteShift(id: number) {
  const response = await fetch(`${API_URL}/api/shifts/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete shift')
  }
}

export async function createShiftsFromTemplate(
  template_id: number,
  start_date: Date,
  end_date: Date,
  employee_ids: number[]
) {
  const response = await fetch(`${API_URL}/api/shifts/template`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_id,
      start_date: format(start_date, 'yyyy-MM-dd'),
      end_date: format(end_date, 'yyyy-MM-dd'),
      employee_ids,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to create shifts from template')
  }
  return response.json()
}