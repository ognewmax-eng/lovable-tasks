import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListTodo, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { departmentNames, roleNames } from '@/types';

const navigation = [
  { name: 'Обзор', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Задачи', href: '/tasks', icon: ListTodo },
  { name: 'Календарь', href: '/calendar', icon: Calendar },
  { name: 'Аналитика', href: '/analytics', icon: BarChart3, roles: ['director', 'head'] },
  { name: 'Сотрудники', href: '/team', icon: Users, roles: ['director', 'head'] },
  { name: 'Настройки', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dept-project to-dept-school flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sidebar-foreground">Планировщик</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-dept-project")} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border">
        {!collapsed ? (
          <div className="p-3 rounded-lg bg-sidebar-accent">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dept-project to-dept-school flex items-center justify-center text-white font-medium">
                {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user && roleNames[user.role]}
                  {user?.department && ` • ${departmentNames[user.department]}`}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="w-full text-sidebar-foreground/70 hover:text-destructive"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        )}
      </div>
    </aside>
  );
}
