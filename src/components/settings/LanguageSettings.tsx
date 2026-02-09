import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Language {
  id: string;
  name: string;
  languageId: string;
  enabled: boolean;
  hasPackage: boolean;
  lastUploadTime?: string;
}

const languages: Language[] = [
  { id: "1", name: "中文", languageId: "zh-CN", enabled: true, hasPackage: true, lastUploadTime: "2026年02月04日 17:22:50" },
  { id: "2", name: "中文(繁体)", languageId: "zh-TW", enabled: false, hasPackage: false },
  { id: "3", name: "English", languageId: "en-US", enabled: true, hasPackage: true, lastUploadTime: "2026年01月15日 10:30:00" },
  { id: "4", name: "русский", languageId: "ru-RU", enabled: true, hasPackage: true, lastUploadTime: "2026年01月10日 14:20:00" },
  { id: "5", name: "Deutsch", languageId: "de-DE", enabled: false, hasPackage: false },
  { id: "6", name: "Français", languageId: "fr-FR", enabled: false, hasPackage: false },
  { id: "7", name: "日本語", languageId: "ja-JP", enabled: false, hasPackage: false },
  { id: "8", name: "한국어", languageId: "ko-KR", enabled: false, hasPackage: false },
  { id: "9", name: "Español", languageId: "es-ES", enabled: false, hasPackage: false },
  { id: "10", name: "Português", languageId: "pt-PT", enabled: false, hasPackage: false },
  { id: "11", name: "Italiano", languageId: "it-IT", enabled: false, hasPackage: false },
];

export function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [languageData, setLanguageData] = useState<Language>(languages[0]);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setLanguageData(lang);
  };

  const handleSave = () => {
    console.log("Saving language settings:", languageData);
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Language List */}
      <div className="w-80 glass-card rounded-lg border border-border/50 overflow-hidden flex flex-col shrink-0">
        <div className="overflow-auto flex-1">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => handleLanguageSelect(lang)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors text-left",
                selectedLanguage.id === lang.id && "bg-muted/50"
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-sm",
                  selectedLanguage.id === lang.id ? "text-primary font-medium" : "text-foreground"
                )}>
                  {lang.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {lang.enabled && (
                  <span className="text-xs text-primary">已开启</span>
                )}
                {lang.hasPackage && (
                  <span className="text-xs text-muted-foreground">已上传语言包</span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Details */}
      <div className="flex-1 glass-card rounded-lg border border-border/50 p-6 overflow-auto">
        <h2 className="text-lg font-semibold text-foreground mb-6">{selectedLanguage.name}</h2>

        {/* Basic Info */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-4">基本信息</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">语言名称 *</Label>
              <Input
                value={languageData.name}
                onChange={(e) => setLanguageData({ ...languageData, name: e.target.value })}
                className="mt-1 bg-card border-border/50"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">language_id *</Label>
              <Input
                value={languageData.languageId}
                onChange={(e) => setLanguageData({ ...languageData, languageId: e.target.value })}
                className="mt-1 bg-card border-border/50"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-2">状态</h3>
          <p className="text-xs text-muted-foreground mb-3">开启后，所有的企业均可添加本语言</p>
          <div className="flex items-center gap-2">
            <Switch
              checked={languageData.enabled}
              onCheckedChange={(checked) => setLanguageData({ ...languageData, enabled: checked })}
            />
            <span className="text-sm text-foreground">已开启</span>
          </div>
        </div>

        {/* Update Language Pack */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-2">更新语言包</h3>
          {languageData.lastUploadTime && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">最后一次上传时间：{languageData.lastUploadTime}</span>
              <a href="#" className="text-xs text-primary hover:underline">下载</a>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">原始资源包</span>
            <a href="#" className="text-xs text-primary hover:underline">下载</a>
          </div>
          
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
            <p className="text-sm text-muted-foreground">拖拽或点击上传文件</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
