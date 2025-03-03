export type TaskPreview = {
  taskName: string;
  dueDate: string;
  dueTime: string;
  priority: 0 | 1 | 2 | 3;
  error: string;
};

export type Task = {
  id: number;
  created_at: string;
  user_id: string;
  task_name: string;
  due_date: string;
  due_time: string;
  priority: 0 | 1 | 2 | 3;
  completed: boolean;
};
