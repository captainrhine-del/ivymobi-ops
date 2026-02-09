import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatisticsSidebar } from "@/components/layout/StatisticsSidebar";
import { StatisticsHeader } from "@/components/layout/StatisticsHeader";
import { UploadFilesTable } from "@/components/uploads/UploadFilesTable";
import { DateRangePicker } from "@/components/statistics/DateRangePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, List } from "lucide-react";

export default function UploadFiles() {
  const [activeNavItem, setActiveNavItem] = useState("upload");
  const [startDate, setStartDate] = useState<Date>(new Date(2026, 1, 1));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const navigate = useNavigate();

  const handleNavItemClick = (id: string) => {
    setActiveNavItem(id);
    if (id === "teams") {
      navigate("/");
    } else if (id === "statistics") {
      navigate("/statistics");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <StatisticsSidebar activeItem={activeNavItem} onItemClick={handleNavItemClick} />
      
      <div className="flex-1 flex flex-col">
        <StatisticsHeader />
        
        <main className="flex-1 p-6">
          {/* Filters Bar */}
          <div className="flex items-center justify-between mb-6">
          <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onClear={() => {
                setStartDate(new Date(2026, 1, 1));
                setEndDate(new Date());
              }}
            />
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索文件..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-card border-border/50"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                className="text-muted-foreground hover:text-foreground"
              >
                {viewMode === "list" ? <LayoutGrid className="w-5 h-5" /> : <List className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Files Table */}
          <UploadFilesTable searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}
