import { departmentNames, Department } from '@/types';
import { cn } from '@/lib/utils';

interface DepartmentProgressProps {
  data: {
    department: Department;
    total: number;
    done: number;
  }[];
}

const departmentColors: Record<Department, { bg: string; fill: string }> = {
  project: { bg: 'bg-dept-project/20', fill: 'bg-dept-project' },
  school: { bg: 'bg-dept-school/20', fill: 'bg-dept-school' },
  support: { bg: 'bg-dept-support/20', fill: 'bg-dept-support' },
};

export function DepartmentProgress({ data }: DepartmentProgressProps) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <h3 className="font-semibold text-foreground mb-6">Прогресс по отделам</h3>
      <div className="space-y-5">
        {data.map(({ department, total, done }) => {
          const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
          const colors = departmentColors[department];

          return (
            <div key={department}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {departmentNames[department]}
                </span>
                <span className="text-sm text-muted-foreground">
                  {done}/{total} задач
                </span>
              </div>
              <div className={cn("h-2.5 rounded-full overflow-hidden", colors.bg)}>
                <div
                  className={cn("h-full rounded-full transition-all duration-500", colors.fill)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
