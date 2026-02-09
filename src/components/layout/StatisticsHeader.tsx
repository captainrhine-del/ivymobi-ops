import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StatisticsHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 glass-card border-b border-border/50">
      {/* Left side - Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">统计</h2>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground animate-glow-pulse">
            3
          </span>
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border/50">
          <span className="hidden sm:block text-sm text-muted-foreground">18511247761</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
