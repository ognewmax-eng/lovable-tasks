import { useState } from 'react';
import { Task, TaskStatus, statusNames } from '@/types';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove?: (taskId: string, newStatus: TaskStatus) => void;
  onTaskClick?: (task: Task) => void;
}

const columns: { status: TaskStatus; color: string }[] = [
  { status: 'pending', color: 'bg-status-pending' },
  { status: 'in_progress', color: 'bg-status-progress' },
  { status: 'done', color: 'bg-status-done' },
  { status: 'overdue', color: 'bg-status-overdue' },
];

export function KanbanBoard({ tasks, onTaskMove, onTaskClick }: KanbanBoardProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (draggedTaskId) {
      onTaskMove?.(draggedTaskId, status);
      setDraggedTaskId(null);
    }
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map(({ status, color }) => (
        <div
          key={status}
          className="flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", color)} />
              <h3 className="font-semibold text-foreground">{statusNames[status]}</h3>
              <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                {getTasksByStatus(status).length}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Column Content */}
          <div
            className={cn(
              "flex-1 min-h-[200px] p-3 rounded-xl bg-muted/30 border-2 border-dashed border-transparent transition-colors",
              draggedTaskId && "border-muted-foreground/20"
            )}
          >
            <div className="space-y-3">
              {getTasksByStatus(status).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={handleDragStart}
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
