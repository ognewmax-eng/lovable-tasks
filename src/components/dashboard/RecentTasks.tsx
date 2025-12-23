import { Task, departmentNames, statusNames } from '@/types';
import { mockUsers } from '@/data/mockData';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RecentTasksProps {
  tasks: Task[];
}

const statusColors = {
  pending: 'bg-status-pending/10 text-status-pending',
  in_progress: 'bg-status-progress/10 text-status-progress',
  done: 'bg-status-done/10 text-status-done',
  overdue: 'bg-status-overdue/10 text-status-overdue',
};

const departmentDots = {
  project: 'bg-dept-project',
  school: 'bg-dept-school',
  support: 'bg-dept-support',
};

export function RecentTasks({ tasks }: RecentTasksProps) {
  const navigate = useNavigate();
  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Последние задачи</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>
          Все задачи
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="space-y-4">
        {recentTasks.map((task) => {
          const assignee = mockUsers.find(u => u.id === task.assigneeId);
          return (
            <div
              key={task.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={cn("w-2.5 h-2.5 rounded-full", departmentDots[task.department])} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{task.title}</p>
                <p className="text-xs text-muted-foreground">
                  {assignee?.name} • {format(new Date(task.dueDate), 'd MMM', { locale: ru })}
                </p>
              </div>
              <span className={cn("px-2 py-1 rounded-md text-xs font-medium", statusColors[task.status])}>
                {statusNames[task.status]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
