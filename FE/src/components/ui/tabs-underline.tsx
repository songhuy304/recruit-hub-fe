"use client";

import { useId, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabsUnderlineItem {
  value: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  content: ReactNode;
}

interface TabsUnderlineProps {
  items: TabsUnderlineItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
  animated?: boolean;
  /** When true (default), each tab trigger stretches equally across the list. */
  tabsTriggerFullWidth?: boolean;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

function TabsUnderline({
  items,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  listClassName,
  contentClassName,
  animated = true,
  tabsTriggerFullWidth = false,
}: TabsUnderlineProps) {
  const layoutIdPrefix = useId();
  const defaultTab = defaultValue ?? items[0]?.value ?? "";
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultTab);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const activeTab = controlledValue ?? uncontrolledValue;
  const activeContent = items.find((item) => item.value === activeTab)?.content;

  const handleTabChange = (newValue: string) => {
    const prevIdx = items.findIndex((item) => item.value === activeTab);
    const nextIdx = items.findIndex((item) => item.value === newValue);

    setDirection(nextIdx > prevIdx ? 1 : -1);

    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }

    onValueChange?.(newValue);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      orientation="horizontal"
      className={cn("h-full", className)}
    >
      <TabsList
        className={cn(
          "no-visible-scrollbar! w-full flex h-auto! justify-start! gap-0! rounded-none border-b border-border bg-transparent p-0!",
          listClassName
        )}
        onMouseLeave={() => setHoveredTab(null)}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.value;
          const isHovered = hoveredTab === item.value;

          return (
            <TabsTrigger
              key={item.value}
              value={item.value}
              onMouseEnter={() => setHoveredTab(item.value)}
              className={cn(
                "relative flex cursor-pointer items-center justify-center bg-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none",
                "border-transparent shadow-none after:hidden data-[state=active]:border-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
                "dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-foreground",
                tabsTriggerFullWidth ? "flex-1" : "flex-none",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative z-10 flex items-center gap-2 rounded-md px-4 py-3">
                {isHovered && (
                  <motion.span
                    layoutId={`${layoutIdPrefix}-hover`}
                    className="pointer-events-none absolute inset-0 rounded-md bg-muted/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                {Icon ? <Icon className="relative z-10 size-4" /> : null}
                <span className="relative z-10">{item.label}</span>
              </span>

              {isActive ? (
                <motion.div
                  layoutId={`${layoutIdPrefix}-indicator`}
                  className="absolute right-0 bottom-[-2px] left-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              ) : null}
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div
        className={cn(
          "relative w-full min-h-0 overflow-hidden h-full",
          contentClassName
        )}
      >
        {animated ? (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full"
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 32,
              }}
            >
              {activeContent}
            </motion.div>
          </AnimatePresence>
        ) : (
          activeContent
        )}
      </div>
    </Tabs>
  );
}

export { TabsUnderline };
