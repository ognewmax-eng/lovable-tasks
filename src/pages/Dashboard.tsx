import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { DepartmentProgress } from '@/components/dashboard/DepartmentProgress';
import { RecentTasks } from '@/components/dashboard/RecentTasks';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { useAuth } from '@/contexts/AuthContext';
import { mockTasks, mockEvents, getTaskStats, getDepartmentStats } from '@/data/mockData';
import { ListTodo, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const stats = getTaskStats();
  const departmentStats = getDepartmentStats();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {greeting()}, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Вот обзор текущих задач и событий
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Всего задач"
            value={stats.total}
            icon={ListTodo}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Выполнено"
            value={stats.done}
            icon={CheckCircle2}
            variant="school"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="В работе"
            value={stats.inProgress}
            icon={Clock}
            variant="project"
          />
          <StatsCard
            title="Просрочено"
            value={stats.overdue}
            icon={AlertTriangle}
            variant="support"
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <RecentTasks tasks={mockTasks} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <DepartmentProgress data={departmentStats} />
            <UpcomingEvents events={mockEvents} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
