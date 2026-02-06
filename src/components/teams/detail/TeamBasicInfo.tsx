import { Phone, MapPin, Globe, Calendar, User, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuperAdmin {
  name: string;
  phone: string;
  email: string;
  lastActive: string;
}

interface TeamBasicInfoProps {
  phone: string;
  address: string;
  website: string;
  createdAt: string;
  superAdmin: SuperAdmin;
}

export function TeamBasicInfo({ phone, address, website, createdAt, superAdmin }: TeamBasicInfoProps) {
  return (
    <div className="glass-card rounded-xl p-6 mt-6">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
        基本信息：
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Company Info */}
        <div className="space-y-4">
          <InfoRow icon={Phone} label="电话" value={phone || "-"} />
          <InfoRow icon={MapPin} label="地址" value={address || "-"} />
          <InfoRow icon={Globe} label="官网" value={website || "-"} isLink={!!website} />
          <InfoRow icon={Calendar} label="创建时间" value={createdAt} />
        </div>

        {/* Right Column - Super Admin Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground">超级管理员：</h3>
            <Button variant="default" size="sm" className="btn-gradient">
              更改超管
            </Button>
          </div>
          <InfoRow icon={User} label="手机号" value={superAdmin.phone || "-"} />
          <InfoRow icon={Mail} label="邮箱" value={superAdmin.email || "-"} />
          <InfoRow icon={Clock} label="最后活跃时间" value={superAdmin.lastActive || "-"} />
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  isLink?: boolean;
}

function InfoRow({ icon: Icon, label, value, isLink }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground shrink-0">{label}：</span>
      {isLink ? (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline truncate"
        >
          {value}
        </a>
      ) : (
        <span className="text-foreground truncate">{value}</span>
      )}
    </div>
  );
}
