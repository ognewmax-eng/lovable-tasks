import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { Button } from '@/components/ui/button';
import { mockTasks } from '@/data/mockData';
import { Task, TaskStatus, Department, departmentNames } from '@/types';
import { Plus, Filter, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'kanban' | 'list';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [departmentFilter, setDepartmentFilter] = useState<Department | 'all'>('all');

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task
      )
    );
  };

  const filteredTasks = departmentFilter === 'all'
    ? tasks
    : tasks.filter(task => task.department === departmentFilter);

  const departments: (Department | 'all')[] = ['all', 'project', 'school', 'support'];

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Задачи</h1>
            <p className="text-muted-foreground">
              Управляйте задачами с помощью канбан-доски
            </p>
          </div>
          <Button variant="gradient" className="sm:w-auto w-full">
            <Plus className="w-4 h-4 mr-2" />
            Новая задача
          </Button>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Department Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                  departmentFilter === dept
                    ? dept === 'all'
                      ? "bg-primary text-primary-foreground"
                      : dept === 'project'
                      ? "bg-dept-project text-white"
                      : dept === 'school'
                      ? "bg-dept-school text-white"
                      : "bg-dept-support text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {dept === 'all' ? 'Все отделы' : departmentNames[dept]}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={cn(
                "p-2 rounded-md transition-all duration-200",
                viewMode === 'kanban' ? "bg-card shadow-soft" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-md transition-all duration-200",
                viewMode === 'list' ? "bg-card shadow-soft" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <KanbanBoard
          tasks={filteredTasks}
          onTaskMove={handleTaskMove}
        />
      </div>
    </MainLayout>
  );
}
