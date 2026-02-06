import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { TeamDetailHeader } from "@/components/teams/detail/TeamDetailHeader";
import { TeamBasicInfo } from "@/components/teams/detail/TeamBasicInfo";
import { TeamUsageStatus } from "@/components/teams/detail/TeamUsageStatus";
import { TeamDataOverview } from "@/components/teams/detail/TeamDataOverview";
import { TeamFeatureToggles } from "@/components/teams/detail/TeamFeatureToggles";
import { TeamSSOConfig } from "@/components/teams/detail/TeamSSOConfig";
import { TeamExtraSettings } from "@/components/teams/detail/TeamExtraSettings";

// Mock team data
const mockTeamData = {
  id: "76c29d8f-68cb-47ae-8031-ba71e63b71ff",
  name: "济南猛玛数控设备有限公司",
  phone: "0531-88888888",
  address: "山东省济南市高新区",
  website: "https://example.com",
  createdAt: "2026-02-05",
  superAdmin: {
    name: "张三",
    phone: "13806411381",
    email: "zhangsan@example.com",
    lastActive: "2026-02-05 14:30"
  },
  usage: {
    version: "免费版",
    liteExpiry: "2026-03-05",
    pimExpiry: "",
    fileSpace: { used: 0, total: 0.2 },
    members: { current: 1, total: 2 },
    fileTraffic: { used: 0, total: 10 },
    productCount: "-"
  },
  stats: {
    potentialCustomers: { value: 0, change: 0 },
    documentViews: { value: 0, change: 0 },
    interests: { value: 0, change: 0 },
    shares: { value: 0, change: 0 },
    downloads: { value: 0, change: 0 },
    visits: { value: 0, change: 0 }
  },
  features: {
    pimEnabled: false,
    yuhuanEnabled: false,
    enterpriseQueryEnabled: false,
    advancedSearchEnabled: false,
    aiAssistantEnabled: false,
    knowledgeQueryEnabled: false,
    imageSearchEnabled: false,
    memberCardEditEnabled: false,
    abbMetadataEnabled: false
  },
  sso: {
    enabled: false,
    authority: "",
    clientId: "",
    redirectUri: "",
    silentRedirectUri: "",
    responseType: "",
    scope: "",
    extraQueryParams: ""
  },
  verticalSearchId: "",
  miniAppDeploy: {
    appId: "",
    secret: ""
  }
};

export default function TeamDetail() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("teams");
  const [searchValue, setSearchValue] = useState("");
  const [teamData, setTeamData] = useState(mockTeamData);

  const handleBack = () => {
    navigate("/");
  };

  const handleNavItemClick = (id: string) => {
    setActiveItem(id);
    if (id === "teams") {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar activeItem={activeItem} onItemClick={handleNavItemClick} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader searchValue={searchValue} onSearchChange={setSearchValue} />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Back Button & Team Header */}
          <TeamDetailHeader 
            teamName={teamData.name} 
            teamId={teamData.id} 
            onBack={handleBack} 
          />

          {/* Basic Info Section */}
          <TeamBasicInfo 
            phone={teamData.phone}
            address={teamData.address}
            website={teamData.website}
            createdAt={teamData.createdAt}
            superAdmin={teamData.superAdmin}
          />

          {/* Usage Status & Data Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TeamUsageStatus usage={teamData.usage} />
            <TeamDataOverview stats={teamData.stats} />
          </div>

          {/* Feature Toggles & SSO Config */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TeamFeatureToggles 
              features={teamData.features}
              onFeatureChange={(key, value) => {
                setTeamData(prev => ({
                  ...prev,
                  features: { ...prev.features, [key]: value }
                }));
              }}
            />
            <TeamSSOConfig 
              sso={teamData.sso}
              onSSOChange={(key, value) => {
                setTeamData(prev => ({
                  ...prev,
                  sso: { ...prev.sso, [key]: value }
                }));
              }}
            />
          </div>

          {/* Extra Settings */}
          <TeamExtraSettings 
            verticalSearchId={teamData.verticalSearchId}
            miniAppDeploy={teamData.miniAppDeploy}
            memberCardEditEnabled={teamData.features.memberCardEditEnabled}
            abbMetadataEnabled={teamData.features.abbMetadataEnabled}
            onMemberCardEditChange={(value) => {
              setTeamData(prev => ({
                ...prev,
                features: { ...prev.features, memberCardEditEnabled: value }
              }));
            }}
            onAbbMetadataChange={(value) => {
              setTeamData(prev => ({
                ...prev,
                features: { ...prev.features, abbMetadataEnabled: value }
              }));
            }}
          />
        </main>
      </div>
    </div>
  );
}
