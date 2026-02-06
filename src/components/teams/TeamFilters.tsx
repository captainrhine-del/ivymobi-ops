import { Plus, Filter, Columns3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamFiltersProps {
  versionFilter: string;
  onVersionFilterChange: (value: string) => void;
}

export function TeamFilters({ versionFilter, onVersionFilterChange }: TeamFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Create Team Button */}
      <Button className="btn-gradient gap-2 h-10">
        <Plus className="w-4 h-4" />
        创建团队
      </Button>

      {/* Version Filter */}
      <Select value={versionFilter} onValueChange={onVersionFilterChange}>
        <SelectTrigger className="w-36 h-10 bg-muted/50 border-border/50 focus:ring-primary/20">
          <SelectValue placeholder="版本" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部版本</SelectItem>
          <SelectItem value="free">免费版</SelectItem>
          <SelectItem value="pro">专业版</SelectItem>
          <SelectItem value="enterprise">企业版</SelectItem>
        </SelectContent>
      </Select>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Additional Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-10 w-10 border-border/50">
          <Filter className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10 border-border/50">
          <Columns3 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
