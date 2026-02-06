import { Bell, User, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DashboardHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function DashboardHeader({ searchValue, onSearchChange }: DashboardHeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 glass-card border-b border-border/50">
      {/* Left side - Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">团队目录</h2>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted/50">
            共 589 个团队
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Desktop Search */}
        <div className="hidden md:flex relative group">
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索团队..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 w-64 bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all"
            />
            {searchValue && (
              <button 
                onClick={() => onSearchChange("")}
                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <Search className="w-5 h-5" />
        </Button>

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

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="absolute top-full left-0 right-0 p-4 glass-card border-b border-border/50 md:hidden animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索团队..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full bg-muted/50 border-border/50"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
