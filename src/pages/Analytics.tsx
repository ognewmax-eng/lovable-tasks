import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { getTaskStats, getDepartmentStats, mockTasks, mockUsers } from '@/data/mockData';
import { departmentNames, Department } from '@/types';
import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Analytics() {
  const stats = getTaskStats();
  const departmentStats = getDepartmentStats();

  const completionRate = stats.total > 0 
    ? Math.round((stats.done / stats.total) * 100) 
    : 0;

  const overdueRate = stats.total > 0
    ? Math.round((stats.overdue / stats.total) * 100)
    : 0;

  const departmentColors: Record<Department, string> = {
    project: 'bg-dept-project',
    school: 'bg-dept-school',
    support: 'bg-dept-support',
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Аналитика</h1>
          <p className="text-muted-foreground">
            Обзор производительности и статистики по отделам
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Всего задач"
            value={stats.total}
            icon={BarChart3}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Выполнение"
            value={`${completionRate}%`}
            icon={CheckCircle2}
            variant="school"
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Просрочено"
            value={`${overdueRate}%`}
            icon={AlertTriangle}
            variant="support"
            trend={{ value: 2, isPositive: false }}
          />
          <StatsCard
            title="Сотрудников"
            value={mockUsers.length}
            icon={Users}
            variant="project"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Department Performance */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-dept-project" />
              Производительность отделов
            </h3>
            <div className="space-y-6">
              {departmentStats.map(({ department, total, done, inProgress, overdue }) => {
                const completion = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={department} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", departmentColors[department])} />
                        <span className="font-medium text-foreground">{departmentNames[department]}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{completion}% выполнено</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                      <div
                        className="h-full bg-status-done transition-all duration-500"
                        style={{ width: `${(done / Math.max(total, 1)) * 100}%` }}
                      />
                      <div
                        className="h-full bg-status-progress transition-all duration-500"
                        style={{ width: `${(inProgress / Math.max(total, 1)) * 100}%` }}
                      />
                      <div
                        className="h-full bg-status-overdue transition-all duration-500"
                        style={{ width: `${(overdue / Math.max(total, 1)) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-status-done" />
                        Выполнено: {done}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-status-progress" />
                        В работе: {inProgress}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-status-overdue" />
                        Просрочено: {overdue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task Distribution */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-dept-school" />
              Распределение задач
            </h3>
            <div className="space-y-4">
              {departmentStats.map(({ department, total }) => {
                const percentage = stats.total > 0 ? Math.round((total / stats.total) * 100) : 0;
                return (
                  <div key={department} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-foreground truncate">
                      {departmentNames[department].split('.')[0]}
                    </div>
                    <div className="flex-1 h-8 rounded-lg bg-muted overflow-hidden">
                      <div
                        className={cn("h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-3", departmentColors[department])}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs font-medium text-white">{total}</span>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-muted-foreground">
                      {percentage}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-dept-support" />
            Активность за последнюю неделю
          </h3>
          <div className="flex items-end gap-2 h-40">
            {[65, 45, 80, 55, 90, 70, 85].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-dept-project to-dept-school transition-all duration-300 hover:opacity-80"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
