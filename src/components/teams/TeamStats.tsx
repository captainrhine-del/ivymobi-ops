import { Users, Crown, Zap, Database } from "lucide-react";

const stats = [
  {
    label: "总团队数",
    value: "589",
    icon: Users,
    change: "+12%",
    positive: true,
  },
  {
    label: "企业版团队",
    value: "45",
    icon: Crown,
    change: "+8%",
    positive: true,
  },
  {
    label: "活跃成员",
    value: "2,847",
    icon: Zap,
    change: "+23%",
    positive: true,
  },
  {
    label: "存储使用",
    value: "156.8 GB",
    icon: Database,
    change: "-5%",
    positive: false,
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
            className="glass-card glow-border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span 
                className={`text-xs font-medium ${
                  stat.positive ? "text-green-400" : "text-red-400"
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
