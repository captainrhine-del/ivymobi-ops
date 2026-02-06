import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { TeamStats } from "@/components/teams/TeamStats";
import { TeamFilters } from "@/components/teams/TeamFilters";
import { TeamTable } from "@/components/teams/TeamTable";

const Index = () => {
  const [activeNavItem, setActiveNavItem] = useState("teams");
  const [searchQuery, setSearchQuery] = useState("");
  const [versionFilter, setVersionFilter] = useState("all");

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <DashboardSidebar 
        activeItem={activeNavItem} 
        onItemClick={setActiveNavItem} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader 
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Background Grid Pattern */}
          <div className="fixed inset-0 grid-pattern pointer-events-none opacity-30" />
          
          <div className="relative z-10 max-w-[1600px] mx-auto animate-fade-in">
            {/* Stats Cards */}
            <TeamStats />

            {/* Filters */}
            <TeamFilters 
              versionFilter={versionFilter}
              onVersionFilterChange={setVersionFilter}
            />

            {/* Team Table */}
            <TeamTable searchQuery={searchQuery} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
