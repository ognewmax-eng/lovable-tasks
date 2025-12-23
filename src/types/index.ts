export type UserRole = 'director' | 'head' | 'specialist';

export type Department = 'project' | 'school' | 'support';

export type TaskStatus = 'pending' | 'in_progress' | 'done' | 'overdue';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: Department;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  department: Department;
  assigneeId: string;
  createdById: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  taskId: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  department: Department;
  startDate: Date;
  endDate: Date;
  location?: string;
  participants: string[];
}

export const departmentNames: Record<Department, string> = {
  project: 'Проектный отдел',
  school: 'Школа.Ямолод',
  support: 'Отдел обеспечения',
};

export const roleNames: Record<UserRole, string> = {
  director: 'Директор',
  head: 'Начальник отдела',
  specialist: 'Специалист',
};

export const statusNames: Record<TaskStatus, string> = {
  pending: 'Ожидает',
  in_progress: 'В работе',
  done: 'Выполнено',
  overdue: 'Просрочено',
};

export const priorityNames: Record<TaskPriority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};
