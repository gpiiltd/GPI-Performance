"use client";

import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

const PopoverRoot = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-transparent dark:border-[#484848] bg-white dark:bg-[#383838] p-4 text-[#191919] dark:text-white shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      onOpenAutoFocus={props.onOpenAutoFocus}
      onCloseAutoFocus={props.onCloseAutoFocus}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export type PopoverPropsType = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  asChild?: boolean;
  align?: "center" | "end" | "start" | undefined;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  alignOffset?: number | undefined;
  sideOffset?: number | undefined;
  onOpenAutoFocus?: (e: Event) => void;
  onCloseAutoFocus?: (e: Event) => void;
};

const Popover = ({
  trigger,
  children,
  open,
  onOpenChange,
  contentClassName,
  asChild = true,
  align,
  side,
  alignOffset,
  sideOffset,
  onOpenAutoFocus,
  onCloseAutoFocus,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> &
  PopoverPropsType) => {
  return (
    <PopoverRoot {...props} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild={asChild}>{trigger}</PopoverTrigger>
      <PopoverContent
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        side={side}
        align={align}
        className={contentClassName}
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        {children}
      </PopoverContent>
    </PopoverRoot>
  );
};
Popover.displayName = PopoverPrimitive.Root.displayName;

export { Popover, PopoverContent, PopoverRoot, PopoverTrigger };
