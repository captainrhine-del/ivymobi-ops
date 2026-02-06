import { ExternalLink } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MiniAppDeploy {
  appId: string;
  secret: string;
}

interface TeamExtraSettingsProps {
  verticalSearchId: string;
  miniAppDeploy: MiniAppDeploy;
  memberCardEditEnabled: boolean;
  abbMetadataEnabled: boolean;
  onMemberCardEditChange: (value: boolean) => void;
  onAbbMetadataChange: (value: boolean) => void;
}

export function TeamExtraSettings({
  verticalSearchId,
  miniAppDeploy,
  memberCardEditEnabled,
  abbMetadataEnabled,
  onMemberCardEditChange,
  onAbbMetadataChange
}: TeamExtraSettingsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Vertical Search ID */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
            垂搜平台企业ID
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {verticalSearchId || "未填写"}
              </span>
              <button className="text-primary hover:text-primary/80 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              企业ID：{verticalSearchId || "未关联"}
            </p>
          </div>
        </div>

        {/* Member Card Edit & ABB Metadata */}
        <div className="glass-card rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">成员自由编辑名片：</span>
              <Switch 
                checked={memberCardEditEnabled} 
                onCheckedChange={onMemberCardEditChange} 
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">ABB eLibrary metadata:</span>
              <Switch 
                checked={abbMetadataEnabled} 
                onCheckedChange={onAbbMetadataChange} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Mini App Deploy */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
          专属小程序自动化部署
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm text-muted-foreground shrink-0 w-16">APP ID:</label>
            <Input 
              value={miniAppDeploy.appId}
              className="bg-muted/30 border-border/50 focus:border-primary/50"
              placeholder="请输入APP ID"
              readOnly
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm text-muted-foreground shrink-0 w-16">Secret:</label>
            <Input 
              type="password"
              value={miniAppDeploy.secret}
              className="bg-muted/30 border-border/50 focus:border-primary/50"
              placeholder="请输入Secret"
              readOnly
            />
          </div>
          <Button 
            variant="secondary" 
            className="w-full mt-2"
            disabled
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
