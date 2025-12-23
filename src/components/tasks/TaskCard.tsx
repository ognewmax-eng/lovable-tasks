import { Task, departmentNames, statusNames, priorityNames } from '@/types';
import { mockUsers } from '@/data/mockData';
import { Calendar, User, AlertCircle, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
  onClick?: () => void;
}

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-status-pending/10 text-status-pending',
  high: 'bg-destructive/10 text-destructive',
};

const departmentColors = {
  project: 'border-l-dept-project bg-dept-project-light',
  school: 'border-l-dept-school bg-dept-school-light',
  support: 'border-l-dept-support bg-dept-support-light',
};

export function TaskCard({ task, onDragStart, onClick }: TaskCardProps) {
  const assignee = mockUsers.find(u => u.id === task.assigneeId);
  const isOverdue = task.status === 'overdue' || (task.status !== 'done' && new Date(task.dueDate) < new Date());

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, task.id)}
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border-l-4 bg-card cursor-pointer transition-all duration-200",
        "hover:shadow-medium hover:-translate-y-0.5 active:scale-[0.98]",
        departmentColors[task.department],
        isOverdue && "ring-1 ring-destructive/30"
      )}
    >
      {/* Priority & Status */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn("px-2 py-1 rounded-md text-xs font-medium", priorityColors[task.priority])}>
          {priorityNames[task.priority]}
        </span>
        {isOverdue && (
          <AlertCircle className="w-4 h-4 text-destructive animate-pulse-soft" />
        )}
      </div>

      {/* Title */}
      <h4 className="font-medium text-card-foreground mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{format(new Date(task.dueDate), 'd MMM', { locale: ru })}</span>
        </div>
        {assignee && (
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-dept-project to-dept-school flex items-center justify-center text-[10px] text-white font-medium">
              {assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
