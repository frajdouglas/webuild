"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  availableDates?: Date[];
  // onSelect?: (date: Date | undefined) => void;
  setSelectedDate?: (date: Date | null) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  availableDates = [],
  setSelectedDate,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-pink-100 hover:text-pink-600"
        ),
        day_selected: "text-pink-500 border-2 border-pink-500 font-bold", // Selected day with pink number and border
        day_today: "text-pink-500", // Pink number for today's date
        day_disabled: "text-muted-foreground opacity-50",
        ...classNames,
      }}
      disabled={(date) =>
        !availableDates.some(
          (availableDate) =>
            availableDate.toDateString() === date?.toDateString()
        )
      }
      onSelect={(day) => setSelectedDate?.(day || null)} // Convert undefined to null
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
