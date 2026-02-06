import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Usage {
  version: string;
  liteExpiry: string;
  pimExpiry: string;
  fileSpace: { used: number; total: number };
  members: { current: number; total: number };
  fileTraffic: { used: number; total: number };
  productCount: string;
}

interface TeamUsageStatusProps {
  usage: Usage;
}

export function TeamUsageStatus({ usage }: TeamUsageStatusProps) {
  const fileSpacePercent = (usage.fileSpace.used / usage.fileSpace.total) * 100;
  const membersPercent = (usage.members.current / usage.members.total) * 100;
  const trafficPercent = (usage.fileTraffic.used / usage.fileTraffic.total) * 100;

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
        使用状况：
      </h2>

      <div className="space-y-5">
        <UsageRow 
          label="版本" 
          value={usage.version} 
          buttonText="更改版本" 
        />
        
        <UsageRow 
          label="Lite到期" 
          value={usage.liteExpiry || "-"} 
          buttonText="更改时间" 
        />
        
        <UsageRow 
          label="PIM到期" 
          value={usage.pimExpiry || "-"} 
          buttonText="更改时间" 
        />
        
        <UsageRowWithProgress 
          label="文件空间" 
          value={`${usage.fileSpace.used} B / ${usage.fileSpace.total} GB`}
          percent={fileSpacePercent}
          buttonText="更改使用量" 
        />
        
        <UsageRowWithProgress 
          label="团队成员" 
          value={`${usage.members.current} / ${usage.members.total} 人`}
          percent={membersPercent}
          buttonText="更改人数" 
        />
        
        <UsageRowWithProgress 
          label="文件流量" 
          value={`${usage.fileTraffic.used} B / ${usage.fileTraffic.total} GB`}
          percent={trafficPercent}
          buttonText="更改流量" 
        />
        
        <UsageRow 
          label="产品数量" 
          value={usage.productCount} 
          buttonText="更改数量" 
        />
      </div>
    </div>
  );
}

interface UsageRowProps {
  label: string;
  value: string;
  buttonText: string;
}

function UsageRow({ label, value, buttonText }: UsageRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-muted-foreground text-sm shrink-0">{label}：</span>
        <span className="text-foreground text-sm truncate">{value}</span>
      </div>
      <Button variant="default" size="sm" className="btn-gradient shrink-0">
        {buttonText}
      </Button>
    </div>
  );
}

interface UsageRowWithProgressProps extends UsageRowProps {
  percent: number;
}

function UsageRowWithProgress({ label, value, percent, buttonText }: UsageRowWithProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-muted-foreground text-sm shrink-0">{label}：</span>
          <span className="text-foreground text-sm truncate">{value}</span>
        </div>
        <Button variant="default" size="sm" className="btn-gradient shrink-0">
          {buttonText}
        </Button>
      </div>
      <Progress value={percent} className="h-1.5" />
    </div>
  );
}
