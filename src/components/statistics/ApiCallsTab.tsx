import { useState } from "react";
import { Search, LayoutGrid, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "./DateRangePicker";

interface ApiCallData {
  id: string;
  teamName: string;
  callCount: number;
}

const mockData: ApiCallData[] = [
  { id: "1", teamName: "松下电器机电（中国）有限公司", callCount: 174 },
  { id: "2", teamName: "北京华丞电子有限公司", callCount: 22 },
  { id: "3", teamName: "ABB电气", callCount: 457 },
];

export function ApiCallsTab() {
  const [startDate, setStartDate] = useState(new Date(2026, 1, 1));
  const [endDate, setEndDate] = useState(new Date(2026, 1, 9));
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const handleClearDates = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const totalItems = mockData.length;
  const totalPages = Math.ceil(totalItems / parseInt(pageSize));

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="flex items-center justify-between">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClear={handleClearDates}
        />

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <LayoutGrid className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-normal">
                <div className="flex items-center gap-1">
                  团队名称
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground font-normal">
                <div className="flex items-center gap-1">
                  调用次数
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item, index) => (
              <TableRow 
                key={item.id} 
                className={`border-border/50 ${index % 2 === 1 ? 'bg-muted/20' : ''}`}
              >
                <TableCell className="text-foreground">{item.teamName}</TableCell>
                <TableCell className="text-foreground">{item.callCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>每页行数</span>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-16 h-8 bg-transparent border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <span>1-{totalItems} / {totalItems}</span>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            ‹
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            ›
          </Button>
        </div>
      </div>
    </div>
  );
}
