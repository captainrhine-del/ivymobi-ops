import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SSOConfig {
  enabled: boolean;
  authority: string;
  clientId: string;
  redirectUri: string;
  silentRedirectUri: string;
  responseType: string;
  scope: string;
  extraQueryParams: string;
}

interface TeamSSOConfigProps {
  sso: SSOConfig;
  onSSOChange: (key: keyof SSOConfig, value: string | boolean) => void;
}

export function TeamSSOConfig({ sso, onSSOChange }: TeamSSOConfigProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
        单点登录：
      </h2>

      <div className="space-y-4">
        {/* SSO Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">状态</span>
          <Switch 
            checked={sso.enabled} 
            onCheckedChange={(val) => onSSOChange("enabled", val)} 
          />
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">跳转到lite中的地址：</p>
          
          <div className="space-y-3">
            <ConfigInput 
              label="authority" 
              value={sso.authority} 
              onChange={(val) => onSSOChange("authority", val)} 
            />
            <ConfigInput 
              label="client_id" 
              value={sso.clientId} 
              onChange={(val) => onSSOChange("clientId", val)} 
            />
            <ConfigInput 
              label="redirect_uri" 
              value={sso.redirectUri} 
              onChange={(val) => onSSOChange("redirectUri", val)} 
            />
            <ConfigInput 
              label="silent_redirect_uri" 
              value={sso.silentRedirectUri} 
              onChange={(val) => onSSOChange("silentRedirectUri", val)} 
            />
            <ConfigInput 
              label="response_type" 
              value={sso.responseType} 
              onChange={(val) => onSSOChange("responseType", val)} 
            />
            <ConfigInput 
              label="scope" 
              value={sso.scope} 
              onChange={(val) => onSSOChange("scope", val)} 
            />
            <ConfigInput 
              label="extraQueryParams" 
              value={sso.extraQueryParams} 
              onChange={(val) => onSSOChange("extraQueryParams", val)} 
            />
          </div>

          <Button className="w-full mt-6 btn-gradient">
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ConfigInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ConfigInput({ label, value, onChange }: ConfigInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-muted/30 border-border/50 focus:border-primary/50"
        placeholder={label}
      />
    </div>
  );
}
