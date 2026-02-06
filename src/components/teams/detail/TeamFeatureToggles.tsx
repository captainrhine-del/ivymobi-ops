import { Switch } from "@/components/ui/switch";

interface Features {
  pimEnabled: boolean;
  yuhuanEnabled: boolean;
  enterpriseQueryEnabled: boolean;
  advancedSearchEnabled: boolean;
  aiAssistantEnabled: boolean;
  knowledgeQueryEnabled: boolean;
  imageSearchEnabled: boolean;
  memberCardEditEnabled: boolean;
  abbMetadataEnabled: boolean;
}

interface TeamFeatureTogglesProps {
  features: Features;
  onFeatureChange: (key: keyof Features, value: boolean) => void;
}

export function TeamFeatureToggles({ features, onFeatureChange }: TeamFeatureTogglesProps) {
  return (
    <div className="space-y-6">
      {/* PIM Section */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
          PIM
        </h2>
        <ToggleRow 
          label="状态" 
          checked={features.pimEnabled} 
          onChange={(val) => onFeatureChange("pimEnabled", val)} 
        />
      </div>

      {/* Smart Sample Section */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
          智能样本
        </h2>
        <ToggleRow 
          label="玉寰3D" 
          description="启用后，产品详情页将展示3D模型，提升用户体验。"
          checked={features.yuhuanEnabled} 
          onChange={(val) => onFeatureChange("yuhuanEnabled", val)} 
        />
      </div>

      {/* Other Features Section */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
          其他功能
        </h2>
        <div className="space-y-4">
          <ToggleRow 
            label="留资时启用企查查接口" 
            checked={features.enterpriseQueryEnabled} 
            onChange={(val) => onFeatureChange("enterpriseQueryEnabled", val)} 
          />
          <ToggleRow 
            label="高级检索" 
            checked={features.advancedSearchEnabled} 
            onChange={(val) => onFeatureChange("advancedSearchEnabled", val)} 
          />
          <ToggleRow 
            label="AI助手" 
            checked={features.aiAssistantEnabled} 
            onChange={(val) => onFeatureChange("aiAssistantEnabled", val)} 
          />
          <ToggleRow 
            label="精准知识库查询" 
            checked={features.knowledgeQueryEnabled} 
            onChange={(val) => onFeatureChange("knowledgeQueryEnabled", val)} 
          />
          <ToggleRow 
            label="图片搜索产品" 
            checked={features.imageSearchEnabled} 
            onChange={(val) => onFeatureChange("imageSearchEnabled", val)} 
          />
        </div>
      </div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

