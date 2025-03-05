export type TaskPreview = {
  taskName: string
  dueDate: Date | null
  dueTime: string | null
  priority: 0 | 1 | 2 | 3
  error: string
}

export type Task = {
  id: number
  created_at: string
  user_id: string
  task_name: string
  due_date: Date | null
  due_time: string | null
  priority: 0 | 1 | 2 | 3
  completed: boolean
}

interface todoFunctions {
  addTodo: (taskPreview: TaskPreview) => void
  toggleCompleted: (id: number) => void
  deleteTodo: (id: number) => void
}

export interface ViewProps {
  loading: boolean
  error: string | null
  functions: todoFunctions
  todos: {
    allTodos: Task[]
    incompletedTodos: Task[]
    completedTodos: Task[]
  }
}

export interface TaskItemProps {
  task: Task
  functions: todoFunctions
}
