import { useState, useCallback } from 'react'

export function useConfirmDialog<T = any>() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<T | null>(null)
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null)

  const open = useCallback((item: T, confirmCallback: () => void) => {
    setData(item)
    setOnConfirm(() => confirmCallback)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setData(null)
    setOnConfirm(null)
  }, [])

  const confirm = useCallback(() => {
    if (onConfirm) {
      onConfirm()
    }
    close()
  }, [onConfirm, close])

  return {
    isOpen,
    data,
    open,
    close,
    confirm
  }
}