import React, { forwardRef } from "react";
import ReactSelect, { Props as ReactSelectProps } from "react-select";
import ReactSelectAsync from "react-select/async";
import ReactSelectCreatable from "react-select/creatable";
import { Label } from "./label";
import { cn } from "@/lib/utils";

type SelectProps<Option, IsMulti extends boolean> = ReactSelectProps<
  Option,
  IsMulti
> & {
  isCreatable?: boolean;
  label?: React.ReactNode;
  helpText?: string | React.ReactNode;
  createLabel?: string;
  error?: string;
  isAsync?: boolean;
  onCreateOption?: (inputValue: string) => void;
  optional?: boolean;
  required?: boolean;
  size?: "xs" | "sm" | "md";
  status?: "bordered" | "plain";
};

const getSelectComponent = (isAsync?: boolean, isCreatable?: boolean) => {
  if (isAsync) {
    return ReactSelectAsync;
  } else if (isCreatable) {
    return ReactSelectCreatable;
  }
  return ReactSelect;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Select = forwardRef<any, SelectProps<any, boolean>>(
  (props, ref) => {
    const {
      label,
      error,
      isCreatable,
      isDisabled,
      placeholder,
      createLabel = "Create",
      helpText,
      isAsync,
      optional,
      required,
      styles,
      size = "sm",
      status = "bordered",
      ...rest
    } = props;

    const SelectComponent = getSelectComponent(isAsync, isCreatable);

    return (
      <div>
        {label && (
          <div className="flex justify-between">
            <Label
              className={cn(
                "mb-1 w-full flex items-center font-medium relative",
                {
                  "text-sm": size === "md",
                  "!text-sm": size === "sm",
                  "text-xs": size === "xs",
                },
              )}
              htmlFor={rest.name}
            >
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
            {optional && (
              <span className="text-sm leading-6 text-gray-500" id="optional">
                Optional
              </span>
            )}
          </div>
        )}
        <div
          className={cn("relative rounded-md max-w-full", {
            "shadow-sm": status === "bordered",
          })}
        >
          <SelectComponent
            formatCreateLabel={(inputValue) => `${createLabel} '${inputValue}'`}
            id={rest.name}
            instanceId={rest.instanceId || rest.name}
            isDisabled={isDisabled}
            placeholder={placeholder ?? "Select an option"}
            ref={ref}
            styles={{
              control: (provided, state) => ({
                ...provided,
                fontSize: 14,
                fontFamily: "DM Sans",
                boxShadow: state.isFocused ? "none" : "none",
                "&:hover": {
                  border: "",
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#f7fafc",
                color: "#313E59",
                fontSize: 14,
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: "hidden",
                opacity: 0,
              }),
              input: (base) => ({
                ...base,
                "input:focus": {
                  boxShadow: "none",
                },
              }),
              placeholder: (provided) => ({
                ...provided,
                fontSize: 14,
              }),
              ...styles,
            }}
            classNames={{
              // control: () => `
              //   border !border-input
              //   !bg-background
              // `,
              control: () =>
                cn("rounded-md text-sm !bg-background !border-0", {
                  "!border !border-input": status === "bordered",
                }),
              menu: () => `
                dark:bg-card dark:text-white
              `,
              option: ({ isFocused, isSelected }) => `
                ${isFocused ? "dark:bg-sidebar-accent" : ""}
                ${isSelected ? "dark:bg-gray-600" : ""}
              `,
              placeholder: () => `
                !text-muted-foreground
              `,
              singleValue: () => `
                !text-foreground
              `,
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#ddd",
              },
            })}
            {...rest}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${rest.name}-error`}>
            {error}
          </p>
        )}
        {helpText && (
          <p
            className="text-xs text-muted-foreground mt-1"
            id={`${rest.name}-description`}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
