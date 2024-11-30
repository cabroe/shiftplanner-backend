import { 
  mockDepartments, 
  mockEmployees, 
  mockShiftTypes, 
  mockShiftTemplates 
} from '@/data/mockData'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Simulated delay to mimic API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage
let departments = [...mockDepartments]
let employees = [...mockEmployees]
let shiftTypes = [...mockShiftTypes]
let shiftTemplates = [...mockShiftTemplates]

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  await delay(300) // Simulate network delay

  // GET requests
  if (!options || options.method === 'GET' || !options.method) {
    switch (endpoint) {
      case 'departments':
        return departments as T
      case 'employees':
        return employees as T
      case 'shifttypes':
        return shiftTypes as T
      case 'shifttemplates':
        return shiftTemplates as T
    }
  }

  // DELETE requests
  if (options.method === 'DELETE') {
    const [resource, id] = endpoint.split('/')
    const numId = parseInt(id)
    
    switch (resource) {
      case 'departments':
        departments = departments.filter(d => d.ID !== numId)
        break
      case 'employees':
        employees = employees.filter(e => e.ID !== numId)
        break
      case 'shifttypes':
        shiftTypes = shiftTypes.filter(t => t.ID !== numId)
        break
      case 'shifttemplates':
        shiftTemplates = shiftTemplates.filter(t => t.ID !== numId)
        break
    }
    return null as T
  }

  // POST/PUT requests
  if (options.method === 'POST' || options.method === 'PUT') {
    const data = JSON.parse(options.body as string)
    const [resource, id] = endpoint.split('/')
    
    if (options.method === 'PUT' && id) {
      // Update existing item
      const numId = parseInt(id)
      switch (resource) {
        case 'departments':
          departments = departments.map(d => d.ID === numId ? { ...d, ...data } : d)
          return data as T
        case 'employees':
          employees = employees.map(e => e.ID === numId ? { ...e, ...data } : e)
          return data as T
        case 'shifttypes':
          shiftTypes = shiftTypes.map(t => t.ID === numId ? { ...t, ...data } : t)
          return data as T
        case 'shifttemplates':
          shiftTemplates = shiftTemplates.map(t => t.ID === numId ? { ...t, ...data } : t)
          return data as T
      }
    } else {
      // Create new item
      const newId = Math.max(...(data.ID ? [0] : getIds(resource))) + 1
      const newItem = { ...data, ID: newId }
      
      switch (resource) {
        case 'departments':
          departments.push(newItem)
          break
        case 'employees':
          employees.push(newItem)
          break
        case 'shifttypes':
          shiftTypes.push(newItem)
          break
        case 'shifttemplates':
          shiftTemplates.push(newItem)
          break
      }
      return newItem as T
    }
  }

  throw new Error(`Unhandled request: ${endpoint}`)
}

function getIds(resource: string): number[] {
  switch (resource) {
    case 'departments':
      return departments.map(d => d.ID)
    case 'employees':
      return employees.map(e => e.ID)
    case 'shifttypes':
      return shiftTypes.map(t => t.ID)
    case 'shifttemplates':
      return shiftTemplates.map(t => t.ID)
    default:
      return []
  }
}

export async function deleteApi(endpoint: string): Promise<void> {
  await fetchApi(endpoint, { method: 'DELETE' })
}

export async function postApi<T>(endpoint: string, data: any): Promise<T> {
  return fetchApi(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export async function putApi<T>(endpoint: string, data: any): Promise<T> {
  return fetchApi(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}