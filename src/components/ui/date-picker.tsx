import * as React from "react"
import { format, subYears } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icon } from "./icon"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateOfBirthPickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  minAge?: number  // Minimum age allowed
  maxAge?: number  // Maximum age allowed
  placeholder?: string
}

export function DatePicker({
  date,
  onDateChange,
  minAge = 0,
  maxAge = 120,
  placeholder = "dd/mm/yyyy",
}: DateOfBirthPickerProps) {
  const today = new Date()
  const maxDate = subYears(today, minAge)
  const minDate = subYears(today, maxAge)

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)
  const [month, setMonth] = React.useState<number>(date?.getMonth() || today.getMonth())
  const [year, setYear] = React.useState<number>(date?.getFullYear() || maxDate.getFullYear())

  const years = React.useMemo(() => {
    const startYear = minDate.getFullYear()
    const endYear = maxDate.getFullYear()
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)
      .sort((a, b) => b - a) // Sort years in descending order
  }, [minDate, maxDate])

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const handleDateSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate)
    if (newDate) {
      setMonth(newDate.getMonth())
      setYear(newDate.getFullYear())
    }
    onDateChange?.(newDate)
  }

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value)
    setYear(newYear)
    
    // Adjust the selected date if it becomes invalid with the new year
    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setFullYear(newYear)
      if (newDate > maxDate || newDate < minDate) {
        setSelectedDate(undefined)
        onDateChange?.(undefined)
      }
    }
  }

  const handleMonthChange = (value: string) => {
    const newMonth = months.indexOf(value)
    setMonth(newMonth)
    
    // Adjust the selected date if it becomes invalid with the new month
    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setMonth(newMonth)
      if (newDate > maxDate || newDate < minDate) {
        setSelectedDate(undefined)
        onDateChange?.(undefined)
      }
    }
  }

  const getAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
          contentClassName="flex items-center justify-between w-full"
        >
          {selectedDate ? (
            <span>
              {format(selectedDate, "PP")} {/* Display date */}
              <span className="text-muted-foreground ml-2">
                ({getAge(selectedDate)} years old) {/* Show age */}
              </span>
            </span>
          ) : (
            <span className="text-sm text-placeholder">{placeholder}</span>
          )}
          <Icon name='calendar' className='w-5 h-5 text-quaternary' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between space-x-2 p-3 border-b">
          {/* Year selector first for better UX in DOB selection */}
          <Select value={year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={months[month]} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          month={new Date(year, month)}
          onMonthChange={(date) => {
            setMonth(date.getMonth())
            setYear(date.getFullYear())
          }}
          initialFocus
          // minDate={minDate}
          // maxDate={maxDate}
          disabled={(date) => date > maxDate || date < minDate}
        />
      </PopoverContent>
    </Popover>
  )
}