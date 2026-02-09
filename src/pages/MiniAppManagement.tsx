import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatisticsSidebar } from "@/components/layout/StatisticsSidebar";
import { StatisticsHeader } from "@/components/layout/StatisticsHeader";
import { MiniAppTable } from "@/components/miniapp/MiniAppTable";
import { Button } from "@/components/ui/button";

export default function MiniAppManagement() {
  const [activeNavItem, setActiveNavItem] = useState("miniapp");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleNavItemClick = (id: string) => {
    setActiveNavItem(id);
    if (id === "teams") {
      navigate("/");
    } else if (id === "statistics") {
      navigate("/statistics");
    } else if (id === "upload") {
      navigate("/upload");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <StatisticsSidebar activeItem={activeNavItem} onItemClick={handleNavItemClick} />
      
      <div className="flex-1 flex flex-col">
        <StatisticsHeader />
        
        <main className="flex-1 p-6 flex flex-col overflow-hidden">
          {/* Title and Description */}
          <div className="mb-4 shrink-0">
            <h1 className="text-xl font-semibold text-foreground mb-2">专属小程序托管管理</h1>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>说明：</p>
              <p>1. 当"小程序号配置信息"有状态为×的配置项时，需要尽快通知客户完善，以便能够顺利发布所有小程序，<a href="#" className="text-primary hover:underline">点击这里</a>获取配置教程。</p>
              <p>2. 当"认证到期间"快到期时，需要尽快通知客户在https://mp.weixin.qq.com里进行认证。</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 mb-4 shrink-0">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              生成体验版
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              提交审核
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              发布小程序
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              平台域名配置
            </Button>
          </div>

          {/* Mini App Table */}
          <div className="flex-1 overflow-hidden">
            <MiniAppTable 
              selectedApps={selectedApps} 
              onSelectionChange={setSelectedApps} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}
