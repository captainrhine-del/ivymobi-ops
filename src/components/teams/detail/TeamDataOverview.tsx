import { SparkLine } from "@/components/charts/SparkLine";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatItem {
  value: number;
  change: number;
  trend?: number[];
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

// Generate mock trend data for visualization
const generateTrend = (value: number, change: number): number[] => {
  const base = Math.max(value - Math.abs(change) * 5, 0);
  const step = (value - base) / 7;
  return Array.from({ length: 8 }, (_, i) => Math.round(base + step * i + (Math.random() - 0.5) * step));
};

export function TeamDataOverview({ stats }: TeamDataOverviewProps) {
  const statItems = [
    { label: "潜在客户总数", ...stats.potentialCustomers, icon: "👥" },
    { label: "资料浏览总数", ...stats.documentViews, icon: "📄" },
    { label: "感兴趣总数", ...stats.interests, icon: "❤️" },
    { label: "分享总数", ...stats.shares, icon: "🔗" },
    { label: "下载总数", ...stats.downloads, icon: "⬇️" },
    { label: "访问活动总数", ...stats.visits, icon: "👁️" },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent animate-pulse" />
        <span className="gradient-text">数据概览</span>
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <StatCard 
            key={index} 
            label={item.label} 
            value={item.value} 
            change={item.change}
            trend={generateTrend(item.value, item.change)}
            icon={item.icon}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  change: number;
  trend: number[];
  icon: string;
  delay: number;
}

function StatCard({ label, value, change, trend, icon, delay }: StatCardProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <div 
      className="relative p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/40 transition-all duration-300 group overflow-hidden animate-fade-in stat-glow"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <span className="text-lg">{icon}</span>
        </div>
        
        <p className="text-2xl font-bold gradient-text number-glow group-hover:animate-pulse-glow transition-all">
          {value.toLocaleString()}
        </p>
        
        {/* Mini Trend Chart */}
        <div className="my-2 -mx-1">
          <SparkLine data={trend} positive={isPositive || change === 0} height={30} />
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            isPositive 
              ? "text-emerald-400 bg-emerald-400/10" 
              : isNegative 
                ? "text-red-400 bg-red-400/10" 
                : "text-muted-foreground bg-muted/50"
          }`}>
            <TrendIcon className="w-3 h-3" />
            <span>{isPositive ? "+" : ""}{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
