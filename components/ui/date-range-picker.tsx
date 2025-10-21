/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { format, subDays, subMonths, subYears, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import {  CalendarDays } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TransactionFilterType } from "@/app/Types/Interfaces/ITransactions"

interface DateRangePickerProps {
  className?: string
  date?: DateRange
  onDateChange?: (date: DateRange | undefined) => void
  onFilterChange?: (filter: TransactionFilterType, dateRange?: DateRange) => void
  placeholder?: string
}

const datePresets = [
  {
    label: "Yesterday",
    filter: "yesterday" as TransactionFilterType,
    getValue: () => ({
      from: subDays(new Date(), 1),
      to: subDays(new Date(), 1),
    }),
  },
  {
    label: "2 days ago",
    filter: "2_days_ago" as TransactionFilterType,
    getValue: () => ({
      from: subDays(new Date(), 2),
      to: subDays(new Date(), 2),
    }),
  },
  {
    label: "3 days ago",
    filter: "3_days_ago" as TransactionFilterType,
    getValue: () => ({
      from: subDays(new Date(), 3),
      to: subDays(new Date(), 3),
    }),
  },
  {
    label: "Last 7 days",
    filter: "last_7_days" as TransactionFilterType,
    getValue: () => ({
      from: subDays(new Date(), 7),
      to: new Date(),
    }),
  },
  {
    label: "Last 30 days",
    filter: "last_30_days" as TransactionFilterType,
    getValue: () => ({
      from: subDays(new Date(), 30),
      to: new Date(),
    }),
  },
  {
    label: "Last 90 days",
    filter: "last_90_days" as TransactionFilterType,
    getValue: () => ({
      from: subDays(new Date(), 90),
      to: new Date(),
    }),
  },
  {
    label: "Last 365 days",
    filter: "last_365_days" as TransactionFilterType,
    getValue: () => ({
      from: subDays(new Date(), 365),
      to: new Date(),
    }),
  },
  {
    label: "Last month",
    filter: "last_month" as TransactionFilterType,
    getValue: () => {
      const lastMonth = subMonths(new Date(), 1)
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
      }
    },
  },
  {
    label: "Last 12 months",
    filter: "last_12_months" as TransactionFilterType,
    getValue: () => ({
      from: subMonths(new Date(), 12),
      to: new Date(),
    }),
  },
  {
    label: "Last year",
    filter: "last_year" as TransactionFilterType,
    getValue: () => {
      const lastYear = subYears(new Date(), 1)
      return {
        from: startOfYear(lastYear),
        to: endOfYear(lastYear),
      }
    },
  },
]

export function DateRangePicker({
  className,
  date,
  onDateChange,
  onFilterChange,
  placeholder,
}: DateRangePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(date)
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isCustom, setIsCustom] = React.useState(false)
  const selectedPresetRef = React.useRef<{ filter: TransactionFilterType; range: DateRange } | null>(null)

  const handlePresetSelect = (preset: typeof datePresets[0]) => {
    const range = preset.getValue()
    setTempDate(range)
    // Store the selected preset filter for later use in handleApply
    selectedPresetRef.current = { filter: preset.filter, range }
  }

  const handleCustomDateSelect = (range: DateRange | undefined) => {
    setTempDate(range)
    // Clear preset selection when custom date is selected
    selectedPresetRef.current = null
  }

  const handleApply = () => {
    setSelectedDate(tempDate)
    onDateChange?.(tempDate)
    
    // Check if this is from a preset selection or custom date range
    if (selectedPresetRef.current) {
      // Use the stored preset filter
      onFilterChange?.(selectedPresetRef.current.filter, tempDate)
      selectedPresetRef.current = null // Clear the ref
    } else if (tempDate?.from && tempDate?.to) {
      // Custom date range
      onFilterChange?.("date_range", tempDate)
    }
    
    setIsOpen(false)
  }

  const handleCancel = () => {
    setTempDate(selectedDate)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    if (!selectedDate?.from) {
      return placeholder || "Today"
    }

    if (selectedDate.from && selectedDate.to) {
      if (selectedDate.from.getTime() === selectedDate.to.getTime()) {
        return format(selectedDate.from, "MMM dd, yyyy")
      }
      return `${format(selectedDate.from, "MMM dd, yyyy")} - ${format(selectedDate.to, "MMM dd, yyyy")}`
    }

    return format(selectedDate.from, "MMM dd, yyyy")
  }

  return (
    <div className={cn("grid gap-2 ", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={'w-full text-sm h-9 rounded-xl'}
          >
            <CalendarDays className=" h-4 w-4" />
            {getDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4 ml-4 rounded-2xl w-full" align="end">
          <div className="flex">
            {/* Preset Filters */}
            <div className="flex flex-col border-r">
              <div className="p-3">
                <div className="grid gap-2">
                  {datePresets.map((preset) => (
                    <Button
                      key={preset.label}
                      variant="ghost"
                      className="justify-start text-left h-8 px-2 text-sm"
                      onClick={() => handlePresetSelect(preset)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start text-left h-8 px-2 text-sm"
                    onClick={() => setIsCustom(true)}
                  >
                    Custom date range
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Calendar */}
            <div className="p-3">
              <Calendar
                mode="range"
                defaultMonth={tempDate?.from}
                selected={tempDate}
                onSelect={handleCustomDateSelect}
                numberOfMonths={2}
              />
              
              {/* Apply/Cancel Buttons */}
              <div className="flex justify-end gap-2 mt-4 pt-8 border-t">
                <Button
                  variant="outline"
                  // size="l"
                  onClick={handleCancel}
                  className="w-[66px] h-9 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  // size="sm"
                  onClick={handleApply}
                  className="bg-[var(--primary-400)] hover:bg-[var(--primary-500)] w-[66px] h-9 rounded-xl"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}