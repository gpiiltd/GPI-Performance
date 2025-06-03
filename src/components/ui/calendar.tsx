/* eslint-disable @typescript-eslint/no-unused-vars */
// import * as React from "react";
// import { cn } from "@/lib/utils";

// import { DayPicker, DropdownProps } from "react-day-picker";
// import { Select, buttonVariants } from ".";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium hidden",

//         // months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         // month: "space-y-4",
//         // caption: "flex justify-center pt-1 relative items-center",
//         // caption_label: "text-sm font-medium",
//         caption_dropdowns: "flex justify-center gap-1 !px-4",

//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
//         ),
//         day_range_end: "day-range-end",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
//         IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
//         Dropdown: ({ value, onChange, children }: DropdownProps) => {
//           const lgOptions = React.Children.toArray(
//             children,
//           ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];

//           // const options = lgOptions?.map((type) => ({
//           //   value: type?.props?.value,
//           //   label: capitalize(type?.props?.value?.toString()),
//           // }));

//           // console.log("value", value);

//           // const selected = options.find((child) => child.value === value);
//           // console.log("selected", selected);

//           const handleChange = (value: string) => {
//             const changeEvent = {
//               target: { value },
//             } as React.ChangeEvent<HTMLSelectElement>;
//             onChange?.(changeEvent);
//           };

//           return (
//             <div className="">
//               <Select
//                 options={lgOptions}
//                 getOptionLabel={(option) => option?.props?.children}
//                 getOptionValue={(option) => option?.props?.value}
//                 value={lgOptions?.find(
//                   (option) => option?.props?.value === value,
//                 )}
//                 size="xs"
//                 onChange={(val) => handleChange(val?.props?.value)}
//                 className="!border-0"
//                 status="plain"
//               />
//             </div>
//           );
//         },
//       }}
//       disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
//       // mode="single"
//       {...props}
//     />
//   );
// }
// Calendar.displayName = "Calendar";

// export { Calendar };

"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-3 ${className}`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-input bg-background shadow-sm hover:bg-default hover:text-default-foreground",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-default [&:has([aria-selected].day-outside)]:bg-default/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-default hover:text-default-foreground",
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-dark",
        day_today: "bg-default text-default-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-default/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-default aria-selected:text-default-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="material-symbols-rounded mr-2 !h-6 !w-6"/>,
        IconRight: ({ ...props }) => <ChevronRight className="material-symbols-rounded mr-2 !h-6 !w-6"/>,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

