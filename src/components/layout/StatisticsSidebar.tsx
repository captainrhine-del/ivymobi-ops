import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  BarChart3, 
  Upload, 
  Box, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
}

const navItems: NavItem[] = [
  { id: "teams", label: "团队目录", icon: Users, path: "/" },
  { id: "statistics", label: "统计", icon: BarChart3, path: "/statistics" },
  { id: "upload", label: "上传文件", icon: Upload, path: "/upload" },
  { id: "miniapp", label: "小程序托管管理", icon: Box, path: "/miniapp" },
  { id: "settings", label: "设置", icon: Settings, path: "/settings" },
];

interface StatisticsSidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function StatisticsSidebar({ activeItem, onItemClick }: StatisticsSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside 
      className={cn(
        "sticky top-0 flex flex-col h-screen glass-card border-r border-border/50 transition-all duration-300 shrink-0",
        collapsed ? "w-20" : "w-24"
      )}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-2 p-4 border-b border-border/50">
        <div className="relative">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <div className="absolute inset-0 w-8 h-8 bg-primary/20 blur-xl" />
        </div>
        {!collapsed && (
          <span className="text-xs text-muted-foreground">运营管理中心</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onItemClick(item.id);
                if (item.path) {
                  navigate(item.path);
                }
              }}
              className={cn(
                "w-full flex flex-col items-center gap-1 py-3 px-2 transition-all",
                isActive 
                  ? "text-primary bg-primary/10 border-l-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && (
                <span className="text-xs text-center leading-tight">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom decoration */}
      <div className="p-4 border-t border-border/50">
        <div className="h-1 w-full rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
      </div>
    </aside>
  );
}
