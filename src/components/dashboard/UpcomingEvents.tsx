import { Event, departmentNames } from '@/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Users } from 'lucide-react';

interface UpcomingEventsProps {
  events: Event[];
}

const departmentColors = {
  project: 'border-l-dept-project bg-dept-project-light',
  school: 'border-l-dept-school bg-dept-school-light',
  support: 'border-l-dept-support bg-dept-support-light',
};

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const upcomingEvents = events
    .filter(e => new Date(e.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <h3 className="font-semibold text-foreground mb-6">Ближайшие события</h3>
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={cn(
              "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-soft cursor-pointer",
              departmentColors[event.department]
            )}
          >
            <h4 className="font-medium text-foreground mb-2">{event.title}</h4>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {format(new Date(event.startDate), "d MMMM, HH:mm", { locale: ru })}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{event.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                <span>{event.participants.length} участников</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
