import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { mockUsers, mockTasks } from '@/data/mockData';
import { departmentNames, roleNames, Department } from '@/types';
import { Plus, Mail, MoreVertical, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const departmentColors: Record<Department, { bg: string; text: string }> = {
  project: { bg: 'bg-dept-project/10', text: 'text-dept-project' },
  school: { bg: 'bg-dept-school/10', text: 'text-dept-school' },
  support: { bg: 'bg-dept-support/10', text: 'text-dept-support' },
};

const avatarGradients: Record<Department | 'none', string> = {
  project: 'from-dept-project to-blue-400',
  school: 'from-dept-school to-emerald-400',
  support: 'from-dept-support to-amber-400',
  none: 'from-gray-400 to-gray-500',
};

export default function Team() {
  const getTasksForUser = (userId: string) => {
    const userTasks = mockTasks.filter(t => t.assigneeId === userId);
    return {
      done: userTasks.filter(t => t.status === 'done').length,
      inProgress: userTasks.filter(t => t.status === 'in_progress').length,
      overdue: userTasks.filter(t => t.status === 'overdue').length,
    };
  };

  const groupedUsers = {
    project: mockUsers.filter(u => u.department === 'project'),
    school: mockUsers.filter(u => u.department === 'school'),
    support: mockUsers.filter(u => u.department === 'support'),
    management: mockUsers.filter(u => !u.department),
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Сотрудники</h1>
            <p className="text-muted-foreground">
              Управление командой и распределение задач
            </p>
          </div>
          <Button variant="gradient" className="sm:w-auto w-full">
            <Plus className="w-4 h-4 mr-2" />
            Добавить сотрудника
          </Button>
        </div>

        {/* Management */}
        {groupedUsers.management.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Руководство</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedUsers.management.map((user) => {
                const tasks = getTasksForUser(user.id);
                return (
                  <div
                    key={user.id}
                    className="p-5 rounded-xl bg-card border border-border hover:shadow-medium transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold",
                          avatarGradients.none
                        )}>
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{roleNames[user.role]}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Department Sections */}
        {(['project', 'school', 'support'] as Department[]).map((dept) => {
          const users = groupedUsers[dept];
          if (users.length === 0) return null;

          const colors = departmentColors[dept];

          return (
            <div key={dept} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("px-3 py-1.5 rounded-lg text-sm font-medium", colors.bg, colors.text)}>
                  {departmentNames[dept]}
                </div>
                <span className="text-sm text-muted-foreground">
                  {users.length} сотрудников
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => {
                  const tasks = getTasksForUser(user.id);
                  return (
                    <div
                      key={user.id}
                      className="p-5 rounded-xl bg-card border border-border hover:shadow-medium transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold",
                            avatarGradients[dept]
                          )}>
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{roleNames[user.role]}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Task Stats */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-1.5 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-status-done" />
                          <span className="text-muted-foreground">{tasks.done}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                          <Clock className="w-4 h-4 text-status-progress" />
                          <span className="text-muted-foreground">{tasks.inProgress}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                          <AlertTriangle className="w-4 h-4 text-status-overdue" />
                          <span className="text-muted-foreground">{tasks.overdue}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
