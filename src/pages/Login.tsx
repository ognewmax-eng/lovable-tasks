import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserRole, Department, roleNames, departmentNames } from '@/types';
import { Building2, User, Users, Briefcase, GraduationCap, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles: { role: UserRole; icon: typeof User; description: string }[] = [
  { role: 'director', icon: Building2, description: 'Полный доступ к системе' },
  { role: 'head', icon: Users, description: 'Управление отделом' },
  { role: 'specialist', icon: User, description: 'Выполнение задач' },
];

const departments: { dept: Department; icon: typeof Briefcase; color: string }[] = [
  { dept: 'project', icon: Briefcase, color: 'bg-dept-project hover:bg-dept-project/90 border-dept-project' },
  { dept: 'school', icon: GraduationCap, color: 'bg-dept-school hover:bg-dept-school/90 border-dept-school' },
  { dept: 'support', icon: Wrench, color: 'bg-dept-support hover:bg-dept-support/90 border-dept-support' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole, selectedDepartment || undefined);
      navigate('/dashboard');
    }
  };

  const needsDepartment = selectedRole === 'head' || selectedRole === 'specialist';

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dept-project via-dept-school to-dept-support p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Планировщик</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Система управления
            <br />
            задачами учреждения
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            Удобное планирование, отслеживание задач и аналитика для эффективной работы всех отделов
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {departments.map(({ dept, icon: Icon }) => (
            <div key={dept} className="p-4 rounded-xl bg-white/10 backdrop-blur">
              <Icon className="w-6 h-6 text-white mb-2" />
              <p className="text-white/90 text-sm font-medium">{departmentNames[dept]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dept-project to-dept-school flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Планировщик</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">Вход в систему</h2>
          <p className="text-muted-foreground mb-8">Выберите вашу роль для входа</p>

          {/* Role Selection */}
          <div className="space-y-3 mb-6">
            {roles.map(({ role, icon: Icon, description }) => (
              <button
                key={role}
                onClick={() => {
                  setSelectedRole(role);
                  if (role === 'director') setSelectedDepartment(null);
                }}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                  "hover:shadow-medium hover:border-primary/50",
                  selectedRole === role
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    selectedRole === role ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{roleNames[role]}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Department Selection */}
          {needsDepartment && (
            <div className="animate-slide-up mb-8">
              <p className="text-sm font-medium text-foreground mb-3">Выберите отдел</p>
              <div className="grid grid-cols-3 gap-3">
                {departments.map(({ dept, icon: Icon, color }) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-center transition-all duration-200",
                      selectedDepartment === dept
                        ? cn(color, "text-white border-transparent")
                        : "border-border bg-card hover:border-muted-foreground/30"
                    )}
                  >
                    <Icon className={cn("w-6 h-6 mx-auto mb-2", selectedDepartment !== dept && "text-muted-foreground")} />
                    <p className={cn("text-xs font-medium", selectedDepartment !== dept && "text-muted-foreground")}>
                      {departmentNames[dept].split('.')[0]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Login Button */}
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            disabled={!selectedRole || (needsDepartment && !selectedDepartment)}
            onClick={handleLogin}
          >
            Войти в систему
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Демо-версия системы. Выберите роль для просмотра функционала.
          </p>
        </div>
      </div>
    </div>
  );
}
