import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

interface AiUsageData {
  id: string;
  teamName: string;
  questionCount: number;
  infoQueryInputUsage: number;
  infoQueryOutputUsage: number;
  infoQueryModel: string;
  dialogInputUsage: number;
  dialogOutputUsage: number;
  dialogModel: string;
}

const mockData: AiUsageData[] = [
  {
    id: "1",
    teamName: "北京华丞电子有限公司",
    questionCount: 1,
    infoQueryInputUsage: 6,
    infoQueryOutputUsage: 0,
    infoQueryModel: "text-embedding-v3",
    dialogInputUsage: 0,
    dialogOutputUsage: 0,
    dialogModel: "deepseek",
  },
  {
    id: "2",
    teamName: "凯恩帝",
    questionCount: 13,
    infoQueryInputUsage: 86,
    infoQueryOutputUsage: 0,
    infoQueryModel: "text-embedding-v3",
    dialogInputUsage: 10101,
    dialogOutputUsage: 42,
    dialogModel: "deepseek",
  },
  {
    id: "3",
    teamName: "兄弟机械商业（上海）有限公司",
    questionCount: 3,
    infoQueryInputUsage: 12,
    infoQueryOutputUsage: 0,
    infoQueryModel: "text-embedding-v3",
    dialogInputUsage: 4294,
    dialogOutputUsage: 18,
    dialogModel: "deepseek",
  },
  {
    id: "4",
    teamName: "三菱电机自动化（中国）有限公司",
    questionCount: 157,
    infoQueryInputUsage: 784166,
    infoQueryOutputUsage: 0,
    infoQueryModel: "text-embedding-v3",
    dialogInputUsage: 159890,
    dialogOutputUsage: 1756,
    dialogModel: "deepseek",
  },
];

type FilterType = "all" | "chat" | "embedding";

export function AiUsageTab() {
  const [startDate, setStartDate] = useState(new Date(2026, 1, 1));
  const [endDate, setEndDate] = useState(new Date(2026, 1, 9));
  const [filterType, setFilterType] = useState<FilterType>("all");
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
      {/* Filter Type Radio */}
      <RadioGroup
        value={filterType}
        onValueChange={(value) => setFilterType(value as FilterType)}
        className="flex items-center gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all" className="text-foreground cursor-pointer">全部</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="chat" id="chat" />
          <Label htmlFor="chat" className="text-foreground cursor-pointer">聊天（对话）token使用情况</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="embedding" id="embedding" />
          <Label htmlFor="embedding" className="text-foreground cursor-pointer">嵌入token使用情况</Label>
        </div>
      </RadioGroup>

      {/* Date Range */}
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onClear={handleClearDates}
      />

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-normal min-w-[180px]">
                  <div className="flex items-center gap-1">
                    团队名称
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  <div className="flex items-center gap-1">
                    问答次数/文件数量
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  <div className="flex items-center gap-1">
                    信息查询输入使...
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  <div className="flex items-center gap-1">
                    信息查询输出使...
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  信息查询使用模型
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  <div className="flex items-center gap-1">
                    对话输入使用量
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  <div className="flex items-center gap-1">
                    对话输出使用量
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  对话使用模型
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
                  <TableCell className="text-foreground">{item.questionCount}</TableCell>
                  <TableCell className="text-foreground">{item.infoQueryInputUsage}</TableCell>
                  <TableCell className="text-foreground">{item.infoQueryOutputUsage}</TableCell>
                  <TableCell className="text-foreground">{item.infoQueryModel}</TableCell>
                  <TableCell className="text-foreground">{item.dialogInputUsage}</TableCell>
                  <TableCell className="text-foreground">{item.dialogOutputUsage}</TableCell>
                  <TableCell className="text-foreground">{item.dialogModel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
