import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { mockEvents, mockTasks } from '@/data/mockData';
import { Event, Task, departmentNames, Department } from '@/types';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const departmentColors = {
  project: 'bg-dept-project',
  school: 'bg-dept-school',
  support: 'bg-dept-support',
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get start day of week (0 = Sunday, adjust for Monday start)
  const startDayOfWeek = monthStart.getDay();
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getEventsForDay = (date: Date) => {
    return mockEvents.filter(event => isSameDay(new Date(event.startDate), date));
  };

  const getTasksForDay = (date: Date) => {
    return mockTasks.filter(task => isSameDay(new Date(task.dueDate), date));
  };

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  const selectedDayTasks = selectedDate ? getTasksForDay(selectedDate) : [];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Календарь</h1>
            <p className="text-muted-foreground">
              Расписание мероприятий и дедлайнов
            </p>
          </div>
          <Button variant="gradient" className="sm:w-auto w-full">
            <Plus className="w-4 h-4 mr-2" />
            Новое событие
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-card border border-border">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground capitalize">
                {format(currentDate, 'LLLL yyyy', { locale: ru })}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Сегодня
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: adjustedStartDay }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Actual days */}
              {daysInMonth.map((day) => {
                const dayEvents = getEventsForDay(day);
                const dayTasks = getTasksForDay(day);
                const hasItems = dayEvents.length > 0 || dayTasks.length > 0;
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "aspect-square p-1 rounded-lg transition-all duration-200 flex flex-col items-center justify-start",
                      isToday(day) && "ring-2 ring-dept-project",
                      isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      !isSameMonth(day, currentDate) && "opacity-30"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium mb-1",
                      isSelected ? "text-primary-foreground" : "text-foreground"
                    )}>
                      {format(day, 'd')}
                    </span>
                    {hasItems && (
                      <div className="flex gap-0.5 flex-wrap justify-center">
                        {dayEvents.slice(0, 3).map((event, i) => (
                          <div
                            key={i}
                            className={cn("w-1.5 h-1.5 rounded-full", departmentColors[event.department])}
                          />
                        ))}
                        {dayTasks.slice(0, 2).map((_, i) => (
                          <div key={`task-${i}`} className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Details */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-dept-project" />
                {selectedDate
                  ? format(selectedDate, 'd MMMM yyyy', { locale: ru })
                  : 'Выберите дату'}
              </h3>

              {selectedDate && (
                <div className="space-y-4">
                  {/* Events */}
                  {selectedDayEvents.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                        События ({selectedDayEvents.length})
                      </p>
                      <div className="space-y-2">
                        {selectedDayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              "p-3 rounded-lg border-l-4",
                              event.department === 'project' && "border-l-dept-project bg-dept-project-light",
                              event.department === 'school' && "border-l-dept-school bg-dept-school-light",
                              event.department === 'support' && "border-l-dept-support bg-dept-support-light"
                            )}
                          >
                            <p className="font-medium text-sm text-foreground">{event.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <span>{format(new Date(event.startDate), 'HH:mm')}</span>
                              {event.location && (
                                <>
                                  <span>•</span>
                                  <MapPin className="w-3 h-3" />
                                  <span>{event.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tasks Due */}
                  {selectedDayTasks.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                        Дедлайны ({selectedDayTasks.length})
                      </p>
                      <div className="space-y-2">
                        {selectedDayTasks.map((task) => (
                          <div
                            key={task.id}
                            className="p-3 rounded-lg bg-muted/50"
                          >
                            <p className="font-medium text-sm text-foreground">{task.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {departmentNames[task.department]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDayEvents.length === 0 && selectedDayTasks.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Нет событий на этот день
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
