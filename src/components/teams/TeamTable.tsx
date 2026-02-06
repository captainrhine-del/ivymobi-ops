import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  MoreHorizontal,
  ExternalLink,
  Trash2,
  Edit,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Team {
  id: string;
  logo?: string;
  name: string;
  teamId: string;
  version: "免费版" | "专业版" | "企业版";
  liteExpiry: string;
  memberCount: string;
  storage: string;
  createdAt: string;
}

// Mock data
const mockTeams: Team[] = [
  { id: "1", name: "济南猛玛数控设备有限公司", teamId: "76c29d8f-68cb-47ae-8031-ba71e63b71ff", version: "免费版", liteExpiry: "2026-03-05", memberCount: "1/2", storage: "0.00/0.20", createdAt: "2026-02-05" },
  { id: "2", name: "鸿泰科技", teamId: "e036d9bc-d134-4ff4-bf94-941b9461f800", version: "免费版", liteExpiry: "2026-03-05", memberCount: "1/2", storage: "0.00/0.20", createdAt: "2026-02-05" },
  { id: "3", name: "大族激光高", teamId: "4022b0e5-88d6-4a21-8186-b49ed1e681d0", version: "专业版", liteExpiry: "2026-03-05", memberCount: "5/10", storage: "1.25/5.00", createdAt: "2026-02-05" },
  { id: "4", name: "威光自动化设备(厦门)有限公司", teamId: "62866274-babd-401f-b4ef-bb974784894b", version: "免费版", liteExpiry: "2026-03-05", memberCount: "1/2", storage: "0.00/0.20", createdAt: "2026-02-05" },
  { id: "5", name: "中山市小榄红福娃机械厂", teamId: "9c9a9e2b-6e36-45fa-a477-b3c805ca33fa", version: "企业版", liteExpiry: "2026-06-15", memberCount: "15/50", storage: "8.50/20.00", createdAt: "2026-02-05" },
  { id: "6", name: "鑫鑫科技", teamId: "76bb04ff-4fa3-4459-bcba-1b5e8872488c", version: "免费版", liteExpiry: "2026-03-05", memberCount: "1/2", storage: "0.00/0.20", createdAt: "2026-02-05" },
  { id: "7", name: "呼强", teamId: "1a2e4669-2b2e-44be-832d-7454e717af4f", version: "免费版", liteExpiry: "2026-03-05", memberCount: "1/2", storage: "0.00/0.20", createdAt: "2026-02-05" },
  { id: "8", name: "熊猫", teamId: "2f195ef3-f3d6-4d2a-be9e-58bc47521309", version: "专业版", liteExpiry: "2026-04-20", memberCount: "3/10", storage: "0.85/5.00", createdAt: "2026-02-05" },
  { id: "9", name: "蓝海智能科技", teamId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", version: "企业版", liteExpiry: "2026-12-31", memberCount: "45/100", storage: "15.00/50.00", createdAt: "2026-01-15" },
  { id: "10", name: "星辰互联", teamId: "b2c3d4e5-f6a7-8901-bcde-f12345678901", version: "免费版", liteExpiry: "2026-03-05", memberCount: "2/2", storage: "0.18/0.20", createdAt: "2026-02-01" },
];

type SortField = "name" | "version" | "liteExpiry" | "memberCount" | "storage" | "createdAt";
type SortOrder = "asc" | "desc";

interface TeamTableProps {
  searchQuery: string;
}

export function TeamTable({ searchQuery }: TeamTableProps) {
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("已复制到剪贴板");
  };

  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.teamId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortOrder === "asc" ? 1 : -1;
    return aValue.localeCompare(bValue) * modifier;
  });

  const paginatedTeams = sortedTeams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedTeams.length / itemsPerPage);

  const getVersionBadgeClass = (version: Team["version"]) => {
    switch (version) {
      case "企业版":
        return "bg-primary/20 text-primary border-primary/30 badge-glow";
      case "专业版":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4 text-primary" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="glass-card rounded-xl overflow-hidden border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-20">
                  Logo
                </th>
                <th 
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    团队名称
                    <SortIcon field="name" />
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  团队ID
                </th>
                <th 
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("version")}
                >
                  <div className="flex items-center gap-2">
                    版本
                    <SortIcon field="version" />
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("liteExpiry")}
                >
                  <div className="flex items-center gap-2">
                    LITE到期
                    <SortIcon field="liteExpiry" />
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("memberCount")}
                >
                  <div className="flex items-center gap-2">
                    成员数量
                    <SortIcon field="memberCount" />
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("storage")}
                >
                  <div className="flex items-center gap-2">
                    文件存储量
                    <SortIcon field="storage" />
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-2">
                    创建时间
                    <SortIcon field="createdAt" />
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-16">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTeams.map((team, index) => (
                <tr 
                  key={team.id} 
                  className="table-row-glow border-b border-border/30 last:border-0"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden">
                      {team.logo ? (
                        <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold gradient-text">
                          {team.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                      {team.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 group">
                      <code className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded">
                        {team.teamId.slice(0, 8)}...
                      </code>
                      <button 
                        onClick={() => copyToClipboard(team.teamId)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getVersionBadgeClass(team.version))}
                    >
                      {team.version}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{team.liteExpiry}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ 
                            width: `${(parseInt(team.memberCount.split("/")[0]) / parseInt(team.memberCount.split("/")[1])) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{team.memberCount}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                          style={{ 
                            width: `${(parseFloat(team.storage.split("/")[0]) / parseFloat(team.storage.split("/")[1])) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{team.storage} GB</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{team.createdAt}</span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" /> 查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" /> 编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="w-4 h-4" /> 打开链接
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <Trash2 className="w-4 h-4" /> 删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <span className="text-sm text-muted-foreground">
          每页 {itemsPerPage} 条 · 共 {sortedTeams.length} 条
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            «
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            ‹
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            {currentPage} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            ›
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            »
          </Button>
        </div>
      </div>
    </div>
  );
}
