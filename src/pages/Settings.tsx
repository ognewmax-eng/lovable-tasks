import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { departmentNames, roleNames } from '@/types';
import { User, Bell, Shield, Palette, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
  const { user, logout } = useAuth();

  const settingsSections = [
    {
      icon: User,
      title: 'Профиль',
      description: 'Управление личными данными и настройками аккаунта',
      action: 'Редактировать',
    },
    {
      icon: Bell,
      title: 'Уведомления',
      description: 'Настройка уведомлений о задачах и событиях',
      action: 'Настроить',
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Пароль, двухфакторная аутентификация',
      action: 'Управление',
    },
    {
      icon: Palette,
      title: 'Внешний вид',
      description: 'Тема, язык и персонализация интерфейса',
      action: 'Изменить',
    },
  ];

  return (
    <MainLayout>
      <div className="animate-fade-in max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Настройки</h1>
          <p className="text-muted-foreground">
            Управление аккаунтом и предпочтениями
          </p>
        </div>

        {/* User Card */}
        <div className="p-6 rounded-xl bg-card border border-border mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-dept-project to-dept-school flex items-center justify-center text-white text-2xl font-bold">
              {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {user && roleNames[user.role]}
                </span>
                {user?.department && (
                  <span className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium",
                    user.department === 'project' && "bg-dept-project/10 text-dept-project",
                    user.department === 'school' && "bg-dept-school/10 text-dept-school",
                    user.department === 'support' && "bg-dept-support/10 text-dept-support"
                  )}>
                    {departmentNames[user.department]}
                  </span>
                )}
              </div>
            </div>
            <Button variant="outline">Изменить фото</Button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4 mb-8">
          {settingsSections.map((section) => (
            <div
              key={section.title}
              className="p-5 rounded-xl bg-card border border-border hover:shadow-soft transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
              <Button variant="ghost">{section.action}</Button>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="p-5 rounded-xl border border-destructive/20 bg-destructive/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Выход из системы</h3>
                <p className="text-sm text-muted-foreground">Завершить текущую сессию</p>
              </div>
            </div>
            <Button variant="destructive" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
