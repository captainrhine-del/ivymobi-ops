import { useState } from "react";
import { format } from "date-fns";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onClear: () => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
}: DateRangePickerProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-muted/30">
      <Popover open={startOpen} onOpenChange={setStartOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 text-foreground hover:bg-transparent">
            {format(startDate, "yyyy/M/d")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={startDate}
            onSelect={(date) => {
              if (date) {
                onStartDateChange(date);
                setStartOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <span className="text-muted-foreground">—</span>

      <Popover open={endOpen} onOpenChange={setEndOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 text-foreground hover:bg-transparent">
            {format(endDate, "yyyy/M/d")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={endDate}
            onSelect={(date) => {
              if (date) {
                onEndDateChange(date);
                setEndOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={onClear}>
        <X className="w-4 h-4" />
      </Button>

      <Calendar className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}
