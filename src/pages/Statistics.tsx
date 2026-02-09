import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticsSidebar } from "@/components/layout/StatisticsSidebar";
import { StatisticsHeader } from "@/components/layout/StatisticsHeader";
import { ApiCallsTab } from "@/components/statistics/ApiCallsTab";
import { AiUsageTab } from "@/components/statistics/AiUsageTab";

export default function Statistics() {
  const [activeTab, setActiveTab] = useState("api-calls");
  const [activeNavItem, setActiveNavItem] = useState("statistics");
  const navigate = useNavigate();

  const handleNavItemClick = (id: string) => {
    setActiveNavItem(id);
    if (id === "teams") {
      navigate("/");
    } else if (id === "upload") {
      navigate("/upload");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <StatisticsSidebar activeItem={activeNavItem} onItemClick={handleNavItemClick} />
      
      <div className="flex-1 flex flex-col">
        <StatisticsHeader />
        
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-border/50 rounded-none w-full justify-start h-auto p-0 mb-6">
              <TabsTrigger 
                value="api-calls"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-3 text-muted-foreground"
              >
                企查查接口调用
              </TabsTrigger>
              <TabsTrigger 
                value="ai-usage"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-3 text-muted-foreground"
              >
                AI使用量
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api-calls" className="mt-0">
              <ApiCallsTab />
            </TabsContent>

            <TabsContent value="ai-usage" className="mt-0">
              <AiUsageTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
