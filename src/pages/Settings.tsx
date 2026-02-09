import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticsSidebar } from "@/components/layout/StatisticsSidebar";
import { StatisticsHeader } from "@/components/layout/StatisticsHeader";
import { LanguageSettings } from "@/components/settings/LanguageSettings";
import { AiPricingSettings } from "@/components/settings/AiPricingSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("language");
  const [activeNavItem, setActiveNavItem] = useState("settings");
  const navigate = useNavigate();

  const handleNavItemClick = (id: string) => {
    setActiveNavItem(id);
    if (id === "teams") {
      navigate("/");
    } else if (id === "statistics") {
      navigate("/statistics");
    } else if (id === "upload") {
      navigate("/upload");
    } else if (id === "miniapp") {
      navigate("/miniapp");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <StatisticsSidebar activeItem={activeNavItem} onItemClick={handleNavItemClick} />
      
      <div className="flex-1 flex flex-col">
        <StatisticsHeader />
        
        <main className="flex-1 p-6 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
            <TabsList className="bg-transparent border-b border-border/50 rounded-none w-full justify-start h-auto p-0 mb-6 shrink-0">
              <TabsTrigger 
                value="language"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-3 text-muted-foreground"
              >
                多语言
              </TabsTrigger>
              <TabsTrigger 
                value="ai-pricing"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-3 text-muted-foreground"
              >
                AI单价维护
              </TabsTrigger>
            </TabsList>

            <TabsContent value="language" className="mt-0 flex-1 overflow-hidden">
              <LanguageSettings />
            </TabsContent>

            <TabsContent value="ai-pricing" className="mt-0 flex-1 overflow-hidden">
              <AiPricingSettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
