import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TabsRoot = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "text-muted-foreground rounded-lg p-1",
      orientation === "horizontal"
        ? "inline-flex h-10 items-center justify-center"
        : "flex flex-col items-start justify-start space-y-1 w-48",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:shadow-sm relative",
      orientation === "vertical" && "w-full text-left justify-start",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, children, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      orientation === "horizontal" ? "mt-2" : "ml-4",
      className,
    )}
    {...props}
  >
    <motion.div
      initial={{
        opacity: 0,
        [orientation === "horizontal" ? "y" : "x"]:
          orientation === "horizontal" ? 10 : -10,
      }}
      animate={{ opacity: 1, [orientation === "horizontal" ? "y" : "x"]: 0 }}
      exit={{
        opacity: 0,
        [orientation === "horizontal" ? "y" : "x"]:
          orientation === "horizontal" ? -10 : -10,
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  </TabsPrimitive.Content>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export type TabItem = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  items: TabItem[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  items,
  orientation = "horizontal",
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  ...props
}: TabsProps) => {
  const [selectedTab, setSelectedTab] = React.useState(
    value || defaultValue || items[0]?.value,
  );

  const handleValueChange = (newValue: string) => {
    setSelectedTab(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsRoot
      defaultValue={defaultValue || items[0]?.value}
      value={value}
      onValueChange={handleValueChange}
      className={cn(
        orientation === "vertical" && "flex flex-row space-x-4",
        className,
      )}
      {...props}
    >
      <TabsList className={listClassName} orientation={orientation}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={triggerClassName}
            orientation={orientation}
          >
            {item.label}
            {item.value === selectedTab && (
              <motion.div
                className={cn(
                  "bg-primary absolute",
                  orientation === "horizontal"
                    ? "bottom-0 left-0 right-0 h-0.5"
                    : "top-0 bottom-0 left-0 w-0.5",
                )}
                layoutId="tab-indicator"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className={cn(orientation === "vertical" && "flex-1")}>
        <AnimatePresence>
          {items.map((item) => (
            <TabsContent
              key={item.value}
              value={item.value}
              className={contentClassName}
              orientation={orientation}
            >
              {item.content}
            </TabsContent>
          ))}
        </AnimatePresence>
      </div>
    </TabsRoot>
  );
};
Tabs.displayName = "Tabs";

export { Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent };
