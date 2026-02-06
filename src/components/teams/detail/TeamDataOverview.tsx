interface StatItem {
  value: number;
  change: number;
}

interface Stats {
  potentialCustomers: StatItem;
  documentViews: StatItem;
  interests: StatItem;
  shares: StatItem;
  downloads: StatItem;
  visits: StatItem;
}

interface TeamDataOverviewProps {
  stats: Stats;
}

export function TeamDataOverview({ stats }: TeamDataOverviewProps) {
  const statItems = [
    { label: "潜在客户总数", ...stats.potentialCustomers },
    { label: "资料浏览总数", ...stats.documentViews },
    { label: "感兴趣总数", ...stats.interests },
    { label: "分享总数", ...stats.shares },
    { label: "下载总数", ...stats.downloads },
    { label: "访问活动总数", ...stats.visits },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
        数据概览：
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <StatCard key={index} label={item.label} value={item.value} change={item.change} />
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  change: number;
}

function StatCard({ label, value, change }: StatCardProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      <p className="text-2xl font-bold gradient-text">{value}</p>
      <p className={`text-xs mt-1 ${isPositive ? "text-green-400" : isNegative ? "text-red-400" : "text-muted-foreground"}`}>
        {isPositive ? "+" : ""}{change}
      </p>
    </div>
  );
}
