import { ArrowLeft, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TeamDetailHeaderProps {
  teamName: string;
  teamId: string;
  onBack: () => void;
}

export function TeamDetailHeader({ teamName, teamId, onBack }: TeamDetailHeaderProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(teamId);
    toast.success("团队ID已复制到剪贴板");
  };

  const handleDelete = () => {
    toast.error("删除团队功能暂未实现");
  };

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">返回团队目录</span>
      </button>

      {/* Team Header Card */}
      <div className="glass-card rounded-xl p-6 glow-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold gradient-text">{teamName}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>团队ID：{teamId}</span>
              <button
                onClick={handleCopyId}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            删除团队
          </Button>
        </div>
      </div>
    </div>
  );
}
