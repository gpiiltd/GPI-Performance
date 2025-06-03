// "use client";

// import * as React from "react";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { DayPicker, DateRange } from "react-day-picker";
// import { Popover } from ".";
// import "react-day-picker/dist/style.css";

// type DateRangePickerProps = {
//   initialRange?: DateRange;
//   onChange?: (range: DateRange | undefined) => void;
// };

// export function DateRangePicker({ initialRange, onChange }: DateRangePickerProps) {
//   const [date, setDate] = React.useState<DateRange | undefined>(initialRange);
//   const [open, setOpen] = React.useState(false);

//   React.useEffect(() => {
//     // Update local state if initialRange changes
//     setDate(initialRange);
//   }, [initialRange]);

//   const formatted =
//     date?.from && date?.to
//       ? `${format(date.from, "MMM dd, yyyy")} - ${format(date.to, "MMM dd, yyyy")}`
//       : date?.from
//       ? `${format(date.from, "MMM dd, yyyy")} - ...`
//       : "Pick a date range";

//   function handleSelect(range: DateRange | undefined) {
//     setDate(range);
//     if (onChange) onChange(range);
//     if (range?.from && range?.to) setOpen(false);
//   }

//   return (
//     <div className="w-full max-w-sm">
//       <Popover
//         open={open}
//         onOpenChange={setOpen}
//         trigger={
//           <button
//             type="button"
//             className="flex items-center justify-between w-full cursor-pointer px-4 py-2 text-left border border-muted-foreground rounded-md shadow-sm bg-white hover:bg-gray-50 dark:bg-[#383838] dark:text-white dark:hover:bg-[#484848]"
//           >
//             <span className="text-gray-900 dark:text-white">{formatted}</span>
//             <CalendarIcon className="ml-2 text-black dark:text-white" />
//           </button>
//         }
//         contentClassName="w-auto p-0"
//         align="start"
//         sideOffset={4}
//       >
//         <DayPicker
//           mode="range"
//           selected={date}
//           onSelect={handleSelect}
//           numberOfMonths={2}
//           initialFocus
//         />
//       </Popover>
//     </div>
//   );
// }

"use client"

import * as React from "react"
import { format, subYears } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar, Button, Popover } from '.'
import { CalendarIcon } from "lucide-react";

interface DateRangePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>
  onChange: (date: DateRange) => void
  selectedDateRange?: (DateRange)
}

export function DateRangePicker({ className, onChange, selectedDateRange }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(
    selectedDateRange || {
      from: subYears(new Date(), 1),
      to: new Date
    }
  );

  // console.log('date-range-picker:', date);

  const handleDateChange = (date: DateRange) => {
    setDate(date);
    onChange(date); // Pass both the start and end dates to the parent component
    console.log('date-range-picker:', date);
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover
        open={open}
        onOpenChange={setOpen}
        contentClassName="w-auto p-0"
        trigger={
          <Button
            id="date"
            // variant='bordered'
            leftNode={<CalendarIcon className="ml-2 text-black dark:text-white" />}
            className={cn(
              "w-[300px] justify-start text-left font-normal border rounded-md cursor-pointer",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        }
      >
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          // onSelect={setDate}
          onSelect={(value) => handleDateChange(value as DateRange)}
          numberOfMonths={2}
        />
      </Popover>
    </div>
  )
}

