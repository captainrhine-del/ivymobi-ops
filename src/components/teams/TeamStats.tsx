import { Users, Crown, Zap, Database } from "lucide-react";
import { SparkLine } from "@/components/charts/SparkLine";

const stats = [
  {
    label: "总团队数",
    value: "589",
    icon: Users,
    change: "+12%",
    positive: true,
    trend: [420, 445, 480, 510, 498, 530, 555, 589],
  },
  {
    label: "企业版团队",
    value: "45",
    icon: Crown,
    change: "+8%",
    positive: true,
    trend: [28, 30, 32, 35, 38, 40, 42, 45],
  },
  {
    label: "活跃成员",
    value: "2,847",
    icon: Zap,
    change: "+23%",
    positive: true,
    trend: [1800, 2100, 2200, 2350, 2480, 2600, 2750, 2847],
  },
  {
    label: "存储使用",
    value: "156.8 GB",
    icon: Database,
    change: "-5%",
    positive: false,
    trend: [180, 175, 170, 168, 165, 162, 159, 156.8],
  },
];

export function TeamStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="glass-card glow-border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold gradient-text group-hover:animate-pulse-glow">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            {/* Sparkline Chart */}
            <div className="mt-3 -mx-1">
              <SparkLine data={stat.trend} positive={stat.positive} height={35} />
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <span 
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.positive 
                    ? "text-destructive bg-destructive/10 shadow-sm shadow-destructive/20" 
                    : "text-emerald-400 bg-emerald-400/10 shadow-sm shadow-emerald-400/20"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">vs 上月</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
