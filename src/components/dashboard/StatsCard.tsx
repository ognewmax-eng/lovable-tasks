import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'project' | 'school' | 'support';
}

const variantStyles = {
  default: 'bg-card border border-border',
  project: 'bg-dept-project-light border-dept-project/20',
  school: 'bg-dept-school-light border-dept-school/20',
  support: 'bg-dept-support-light border-dept-support/20',
};

const iconStyles = {
  default: 'bg-primary/10 text-primary',
  project: 'bg-dept-project/20 text-dept-project',
  school: 'bg-dept-school/20 text-dept-school',
  support: 'bg-dept-support/20 text-dept-support',
};

export function StatsCard({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <div className={cn(
      "p-6 rounded-xl transition-all duration-200 hover:shadow-medium",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              trend.isPositive ? "text-status-done" : "text-destructive"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% за неделю
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
