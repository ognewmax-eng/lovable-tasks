import { Task, Event, User, Department, TaskStatus } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Иванов А.П.', email: 'director@example.com', role: 'director' },
  { id: '2', name: 'Сидорова М.И.', email: 'head.project@example.com', role: 'head', department: 'project' },
  { id: '3', name: 'Козлов Д.С.', email: 'head.school@example.com', role: 'head', department: 'school' },
  { id: '4', name: 'Новикова Е.А.', email: 'head.support@example.com', role: 'head', department: 'support' },
  { id: '5', name: 'Петров С.Н.', email: 'specialist1@example.com', role: 'specialist', department: 'project' },
  { id: '6', name: 'Смирнова А.В.', email: 'specialist2@example.com', role: 'specialist', department: 'school' },
  { id: '7', name: 'Федоров И.К.', email: 'specialist3@example.com', role: 'specialist', department: 'support' },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Подготовить презентацию для конференции',
    description: 'Создать презентацию о результатах работы за квартал',
    status: 'in_progress',
    priority: 'high',
    department: 'project',
    assigneeId: '5',
    createdById: '2',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Провести занятие по программированию',
    description: 'Вводное занятие для новой группы воспитанников',
    status: 'pending',
    priority: 'medium',
    department: 'school',
    assigneeId: '6',
    createdById: '3',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Проверить систему отопления',
    description: 'Плановая проверка отопительной системы перед сезоном',
    status: 'done',
    priority: 'high',
    department: 'support',
    assigneeId: '7',
    createdById: '4',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Организовать новогодний праздник',
    description: 'Разработать сценарий и подготовить мероприятие',
    status: 'in_progress',
    priority: 'high',
    department: 'project',
    assigneeId: '5',
    createdById: '2',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Обновить учебные материалы',
    description: 'Актуализировать презентации и методички',
    status: 'pending',
    priority: 'low',
    department: 'school',
    assigneeId: '6',
    createdById: '3',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Заменить лампы в коридоре',
    description: 'Установить новые LED-лампы на втором этаже',
    status: 'overdue',
    priority: 'medium',
    department: 'support',
    assigneeId: '7',
    createdById: '4',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '7',
    title: 'Подготовить отчёт для министерства',
    description: 'Ежеквартальный отчёт о деятельности учреждения',
    status: 'in_progress',
    priority: 'high',
    department: 'project',
    assigneeId: '2',
    createdById: '1',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '8',
    title: 'Провести мастер-класс по робототехнике',
    description: 'Практическое занятие с использованием LEGO Mindstorms',
    status: 'pending',
    priority: 'medium',
    department: 'school',
    assigneeId: '6',
    createdById: '3',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Новогодний концерт',
    description: 'Праздничное мероприятие для воспитанников',
    department: 'project',
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    location: 'Актовый зал',
    participants: ['5', '6'],
  },
  {
    id: '2',
    title: 'Занятие: Основы программирования',
    description: 'Еженедельное занятие для группы А',
    department: 'school',
    startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
    location: 'Кабинет 205',
    participants: ['6'],
  },
  {
    id: '3',
    title: 'Техническое обслуживание',
    description: 'Плановое ТО вентиляционной системы',
    department: 'support',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
    location: 'Техническое помещение',
    participants: ['7'],
  },
  {
    id: '4',
    title: 'Совещание руководителей',
    description: 'Еженедельное совещание начальников отделов',
    department: 'project',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
    location: 'Конференц-зал',
    participants: ['1', '2', '3', '4'],
  },
];

export const getTasksByStatus = (status: TaskStatus): Task[] => {
  return mockTasks.filter(task => task.status === status);
};

export const getTasksByDepartment = (department: Department): Task[] => {
  return mockTasks.filter(task => task.department === department);
};

export const getTaskStats = () => {
  const total = mockTasks.length;
  const done = mockTasks.filter(t => t.status === 'done').length;
  const inProgress = mockTasks.filter(t => t.status === 'in_progress').length;
  const pending = mockTasks.filter(t => t.status === 'pending').length;
  const overdue = mockTasks.filter(t => t.status === 'overdue').length;

  return { total, done, inProgress, pending, overdue };
};

export const getDepartmentStats = () => {
  const departments: Department[] = ['project', 'school', 'support'];
  return departments.map(dept => ({
    department: dept,
    total: mockTasks.filter(t => t.department === dept).length,
    done: mockTasks.filter(t => t.department === dept && t.status === 'done').length,
    inProgress: mockTasks.filter(t => t.department === dept && t.status === 'in_progress').length,
    overdue: mockTasks.filter(t => t.department === dept && t.status === 'overdue').length,
  }));
};
