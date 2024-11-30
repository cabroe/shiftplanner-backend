import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimeSelectProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function TimeSelect({ value, onChange, required }: TimeSelectProps) {
  const getTimeOptions = () => {
    const options = []
    for(let hour = 0; hour < 24; hour++) {
      for(let minute of ['00', '30']) {
        options.push(`${hour.toString().padStart(2, '0')}:${minute}`)
      }
    }
    return options
  }

  return (
    <Select
      value={value}
      onValueChange={onChange}
      required={required}
    >
      <SelectTrigger>
        <SelectValue placeholder="Zeit wählen" />
      </SelectTrigger>
      <SelectContent>
        {getTimeOptions().map(time => (
          <SelectItem key={time} value={time}>
            {time} Uhr
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}