import { format, isWeekend } from 'date-fns'
import { de } from 'date-fns/locale'

export function formatDate(date: Date, formatStr: string): string {
  return format(date, formatStr, { locale: de })
}

export function formatDateTime(date: Date): string {
  return formatDate(date, 'dd.MM.yyyy HH:mm')
}

export function formatWeekday(date: Date): string {
  return formatDate(date, 'EEEE')
}

export function isWeekendDay(date: Date): boolean {
  return isWeekend(date)
}

export function formatTime(time: string): string {
  return `${time} Uhr`
}