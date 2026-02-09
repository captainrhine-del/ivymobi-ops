import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  BarChart3, 
  Upload, 
  Box, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  { id: "miniapp", label: "小程序托管管理", icon: Box },
  { id: "settings", label: "设置", icon: Settings },
];

interface DashboardSidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function DashboardSidebar({ activeItem, onItemClick }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside 
      className={cn(
        "sticky top-0 flex flex-col h-screen glass-card border-r border-border/50 transition-all duration-300 shrink-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-6 border-b border-border/50">
        <div className="relative">
          <Hexagon className="w-10 h-10 text-primary animate-glow-pulse" />
          <div className="absolute inset-0 w-10 h-10 bg-primary/20 blur-xl" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold gradient-text">运营中心</h1>
            <p className="text-xs text-muted-foreground">Operations Hub</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
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
                "nav-item w-full text-left group",
                isActive && "active"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 transition-colors shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} 
              />
              {!collapsed && (
                <span 
                  className={cn(
                    "transition-colors text-sm",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Bottom decoration */}
      <div className="p-4 border-t border-border/50">
        <div className="h-1 w-full rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
      </div>
    </aside>
  );
}
