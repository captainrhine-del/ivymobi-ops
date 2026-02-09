import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X } from "lucide-react";

interface MiniAppConfig {
  category: string;
  privacyPolicy: boolean;
  certification: boolean;
  filing: boolean;
}

interface MiniAppStatus {
  generation: string;
  review: string;
  publish: string;
}

interface MiniApp {
  id: string;
  companyName: string;
  config: MiniAppConfig;
  certExpiry: string;
  authTime: string;
  lastPublishTime: string;
  status: MiniAppStatus;
}

// Mock data
const mockMiniApps: MiniApp[] = [
  {
    id: "1",
    companyName: "",
    config: {
      category: "×",
      privacyPolicy: false,
      certification: false,
      filing: false,
    },
    certExpiry: "无",
    authTime: "2025.08.27 10:45",
    lastPublishTime: "无",
    status: {
      generation: "无",
      review: "无",
      publish: "无",
    },
  },
  {
    id: "2",
    companyName: "样本通专属",
    config: {
      category: "商业服务>企业管理",
      privacyPolicy: true,
      certification: true,
      filing: true,
    },
    certExpiry: "2026.03.18 12:31",
    authTime: "2025.08.21 19:21",
    lastPublishTime: "2025.09.10 08:10",
    status: {
      generation: "V2.0.12 生成成功",
      review: "V2.0.12 审核成功",
      publish: "V2.0.12 发布成功",
    },
  },
  {
    id: "3",
    companyName: "所以应该叫啥",
    config: {
      category: "工具>信息查询",
      privacyPolicy: false,
      certification: true,
      filing: false,
    },
    certExpiry: "2026.08.22 09:15",
    authTime: "2025.08.21 17:36",
    lastPublishTime: "无",
    status: {
      generation: "V2.0.0 生成成功",
      review: "无",
      publish: "无",
    },
  },
  {
    id: "4",
    companyName: "ME自动化资料库",
    config: {
      category: "工具>信息查询",
      privacyPolicy: true,
      certification: true,
      filing: true,
    },
    certExpiry: "2027.02.08 17:47",
    authTime: "2025.06.25 13:35",
    lastPublishTime: "2025.08.24 20:28",
    status: {
      generation: "V1.6.32 生成成功",
      review: "V1.6.32 审核成功",
      publish: "V1.6.32 发布成功",
    },
  },
  {
    id: "5",
    companyName: "华中数控",
    config: {
      category: "工具>信息查询",
      privacyPolicy: true,
      certification: true,
      filing: true,
    },
    certExpiry: "2026.07.09 13:52",
    authTime: "2025.06.23 13:22",
    lastPublishTime: "2025.11.08 19:01",
    status: {
      generation: "V1.6.32 生成成功",
      review: "V1.6.32 审核成功",
      publish: "V1.6.32 发布成功",
    },
  },
];

interface MiniAppTableProps {
  selectedApps: string[];
  onSelectionChange: (apps: string[]) => void;
}

export function MiniAppTable({ selectedApps, onSelectionChange }: MiniAppTableProps) {
  const allSelected = selectedApps.length === mockMiniApps.length;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(mockMiniApps.map((app) => app.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedApps.includes(id)) {
      onSelectionChange(selectedApps.filter((appId) => appId !== id));
    } else {
      onSelectionChange([...selectedApps, id]);
    }
  };

  const StatusIcon = ({ value }: { value: boolean }) => (
    value ? (
      <Check className="w-3 h-3 text-primary inline" />
    ) : (
      <X className="w-3 h-3 text-destructive inline" />
    )
  );

  const getActions = (app: MiniApp) => {
    const hasFullConfig = app.config.privacyPolicy && app.config.certification && app.config.filing;
    if (hasFullConfig) {
      return (
        <div className="flex flex-col gap-1">
          <a href="#" className="text-primary hover:underline text-xs">重新配置域名</a>
          <a href="#" className="text-primary hover:underline text-xs">配置隐私协议</a>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-1">
        <a href="#" className="text-primary hover:underline text-xs">配置域名</a>
        <a href="#" className="text-primary hover:underline text-xs">配置隐私协议</a>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-lg border border-border/50 overflow-hidden flex flex-col flex-1">
      <div className="overflow-auto flex-1">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent h-8">
              <TableHead className="text-muted-foreground font-medium w-12 py-1 text-xs">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={allSelected} 
                    onCheckedChange={handleSelectAll}
                  />
                  <span>全选</span>
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium py-1 text-xs w-32">企业名称</TableHead>
              <TableHead className="text-muted-foreground font-medium py-1 text-xs">小程序号配置信息 认证到期时间</TableHead>
              <TableHead className="text-muted-foreground font-medium py-1 text-xs w-32">授权时间</TableHead>
              <TableHead className="text-muted-foreground font-medium py-1 text-xs w-32">最新发布时间</TableHead>
              <TableHead className="text-muted-foreground font-medium py-1 text-xs w-36">最新状态</TableHead>
              <TableHead className="text-muted-foreground font-medium py-1 text-xs w-24">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMiniApps.map((app) => (
              <TableRow key={app.id} className="border-border/50 hover:bg-muted/30">
                <TableCell className="py-2">
                  <Checkbox
                    checked={selectedApps.includes(app.id)}
                    onCheckedChange={() => handleSelectOne(app.id)}
                  />
                </TableCell>
                <TableCell className="text-muted-foreground py-2 text-xs">
                  {app.companyName || "-"}
                </TableCell>
                <TableCell className="py-2">
                  <div className="text-xs space-y-0.5">
                    <div className="text-muted-foreground">
                      类目: {app.config.category === "×" ? <X className="w-3 h-3 text-destructive inline" /> : app.config.category}
                    </div>
                    <div className="text-muted-foreground">
                      隐私协议: <StatusIcon value={app.config.privacyPolicy} />
                    </div>
                    <div className="text-muted-foreground">
                      认证: <StatusIcon value={app.config.certification} />
                    </div>
                    <div className="text-muted-foreground">
                      备案: <StatusIcon value={app.config.filing} />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground py-2 text-xs">{app.authTime}</TableCell>
                <TableCell className="text-muted-foreground py-2 text-xs">{app.lastPublishTime}</TableCell>
                <TableCell className="py-2">
                  <div className="text-xs space-y-0.5">
                    <div className="text-muted-foreground">生成: {app.status.generation}</div>
                    <div className="text-muted-foreground">审核: {app.status.review}</div>
                    <div className="text-muted-foreground">发布: {app.status.publish}</div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  {getActions(app)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
