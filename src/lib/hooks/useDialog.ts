import { useState, useCallback } from 'react'

export function useDialog<T = any>(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)
  const [data, setData] = useState<T | null>(null)

  const open = useCallback((item?: T) => {
    setData(item || null)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setData(null)
  }, [])

  return {
    isOpen,
    data,
    open,
    close
  }
}