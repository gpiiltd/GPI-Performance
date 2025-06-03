import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Label } from ".";

export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "size"
  > {
  label?: string;
  size?: "xs" | "sm" | "md";
  required?: boolean;
  rightlabel?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  error?: string;
  helpText?: string;
}

export const inputContainerVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      status: {
        default: "",
        // "border-[#D7D7D7] dark:border-[#676767] bg-white  text-[#191919] dark:!bg-transparent caret-[#00B2A9] focus-within:bg-white dark:focus-within:!bg-transparent dark:text-white focus-within:border-[#00B2A9] dark:focus-within:border-[#9299A2] dark:disabled:!border-[#9299A2]",
        error: "",
        // "placeholder:text-status-error-fill bg-status-error-bg border-status-error-fill dark:!bg-status-error-bg-dark text-status-error-fill focus-within:bg-status-error-bg focus-within:border-status-error-fill",
        loading: "",
        prefilled: "",
        // "bg-[#F6F6F6] border-[#D7D7D7] dark:!bg-transparent caret-[#D7D7D7] focus-within:bg-[#F6F6F6] focus-within:border-[#D7D7D7] dark:!border-[#9299A2] dark:focus-within:border-[#9299A2]",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      size = "sm",
      required,
      rightlabel,
      id,
      error,
      trailingIcon,
      helpText,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="flex">
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
        <div
          className="relative"
          // className={cn(inputContainerVariants({ status: "default" }), "relative", className)}
        >
          <input
            type={type}
            className={cn(
              "flex h-10 -z-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              cn(inputContainerVariants({ status: "default" })),
              className,
            )}
            ref={ref}
            {...props}
          />
          {trailingIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-30">
              {trailingIcon || (
                <HiOutlineExclamationCircle
                  aria-hidden="true"
                  className="h-5 w-5 text-red-500"
                />
              )}
            </div>
          )}
        </div>
        <div className="flex w-full justify-between mt-1">
          {!!error && (
            <div
              id={id ? id + "_error" : "input_error"}
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
  },
);
Input.displayName = "Input";

export { Input };
