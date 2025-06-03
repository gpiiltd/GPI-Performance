
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { DayPickerSingleProps } from "react-day-picker";
import {
  Calendar,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  inputContainerVariants,
  Label
} from ".";

interface DateTriggerProps extends VariantProps<typeof inputContainerVariants> {
  value: Date | undefined;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
}

// Shared props between components
interface SharedDateProps {
  label?: string;
  size?: "xs" | "sm" | "md";
  required?: boolean;
  rightlabel?: React.ReactNode;
  error?: string;
  helpText?: string;
  id?: string;
}

const iconStrokeVariants = cva("", {
  variants: {
    status: {
      default: "stroke-[#191919] dark:stroke-[#D7D7D7]",
      error: "stroke-status-error-fill",
      loading: "",
      prefilled:
        "!bg-[#F6F6F6] border-[#D7D7D7] caret-[#D7D7D7] focus-within:bg-[#F6F6F6] focus-within:border-[#D7D7D7]",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

const format = (date: Date | undefined, placeholder: React.ReactNode) => {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : placeholder;
};

function Trigger({
  status,
  value,
  className,
  placeholder = "Pick a date",
  ...props
}: DateTriggerProps) {
  let statusProp = status;

  if (props.disabled) statusProp = "prefilled";
  if (props.error) statusProp = "error";
  if (props.isLoading) statusProp = "loading";

  return (
    <PopoverTrigger
      asChild
      className={cn(
        inputContainerVariants({ status: statusProp }),
        "cursor-pointer",
        className,
      )}
    >
      <div className="w-full flex flex-row items-center">
        <svg
          className="mr-2 h-5 w-5"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2V5"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 2V5"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className={cn(iconStrokeVariants({ status: statusProp }))}
            d="M3.5 9.09009H20.5"
            stroke="#191919"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6937 13.7002H15.7027"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6937 16.7002H15.7027"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9945 13.7002H12.0035"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9945 16.7002H12.0035"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.29529 13.7002H8.30427"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.29529 16.7002H8.30427"
            className={cn(iconStrokeVariants({ status: statusProp }))}
            stroke="#191919"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span
          className={cn(
            "text-base",
            !value ? "text-[#C4C4C4] dark:text-[#9299A2]" : "",
          )}
        >
          {format(value, placeholder)}
        </span>
      </div>
    </PopoverTrigger>
  );
}

type DateProps = {
  children: React.ReactNode;
  modal?: boolean;
  disableDate?: boolean;
} & Omit<DayPickerSingleProps, "mode">;

function Picker({
  children,
  captionLayout = "dropdown-buttons",
  fromYear = 1900,
  toYear = new Date().getFullYear(),
  disableDate,
  modal,
  ...props
}: DateProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <PopoverRoot
      modal={modal}
      open={disableDate ? false : open}
      onOpenChange={setOpen}
    >
      {children}
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          fromYear={fromYear}
          toYear={toYear}
          captionLayout={captionLayout}
          initialFocus
          {...props}
        />
      </PopoverContent>
    </PopoverRoot>
  );
}

// New wrapper component that mimics Input's structure
function DateInputWrapper({
  label,
  size = "xs",
  required,
  rightlabel,
  id,
  error,
  helpText,
  className,
  value,
  placeholder,
  disabled,
  status,
  isLoading,
  ...props
}: DateTriggerProps & SharedDateProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex w-full">
          {!!label && (
            <Label
              htmlFor={id}
              className={cn(
                "mb-1 w-full flex items-center font-medium relative",
                {
                  "text-sm": size === "md",
                  "!text-sm": size === "sm",
                  "text-xs": size === "xs",
                },
              )}
            >
              {label}
              {required && <span className="text-red-600">*</span>}
            </Label>
          )}
          {rightlabel && (
            <span
              className="text-sm ml-auto leading-6 text-gray-500"
              id="optional"
            >
              {rightlabel}
            </span>
          )}
        </div>
      </div>
      <Trigger
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        status={status}
        isLoading={isLoading}
        error={error}
        className={className}
        {...props}
      />
      <div className="flex w-full justify-between mt-1">
        {!!error && (
          <div
            id={id ? id + "_error" : "dateinput_error"}
            className="text-sm flex-1 text-red-500 float-left"
          >
            {error}
          </div>
        )}
      </div>
      {helpText && (
        <p className="text-xs text-muted-foreground mt-1">{helpText}</p>
      )}
    </div>
  );
}

const DateInput = {
  Picker,
  Trigger,
  Wrapper: DateInputWrapper, // Add the wrapper component
};

export { DateInput };
