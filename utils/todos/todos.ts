import { useState, useEffect } from "react"
import { TaskPreview } from "@/types/types"
import { Task } from "@/types/types"
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../supabase/todoAction"
import { getFormattedDate } from "../time/time"

export function useTodos() {
  const [allTodos, setAllTodos] = useState<Task[]>([])
  const completedTodos = allTodos.filter((todo) => todo.completed)
  const incompletedTodos = allTodos.filter((todo) => !todo.completed)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch Todos
  useEffect(() => {
    async function fetchTodos() {
      getTasks().then((response) => {
        if (response.error) {
          setError("Failed to load todos")
        } else {
          if (response.data) {
            setAllTodos(response.data)
          }
        }
        setLoading(false)
      })
    }
    fetchTodos()
  }, [])

  // Add a new todo
  const addTodo = async (taskPreview: TaskPreview) => {
    const newTask = {
      id: -1,
      created_at: "",
      user_id: "",
      task_name: taskPreview.taskName,
      due_date: taskPreview.dueDate
        ? getFormattedDate(taskPreview.dueDate)
        : null,
      due_time: taskPreview.dueTime,
      priority: taskPreview.priority,
      completed: false,
    } as Task

    // Update UI first (Optimistic update)
    setAllTodos((prev) => [...prev, newTask])

    const { error, data } = await addTask(newTask)
    if (error) {
      setError("Failed to add todo")
      setAllTodos((prev) => prev.filter((t) => t.id !== newTask.id)) // Revert on failure
      return
    }
    // Set the ID of the new task
    if (data) {
      setAllTodos((prev) =>
        prev.map((t) => (t.id === -1 ? { ...t, id: data.id } : t))
      )
    }
  }

  const editTodo = async (id: number, task: Task) => {
    const previousState = allTodos.find((t) => t.id === id)
    if (!previousState) {
      return
    }
    setAllTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...task } : t))
    )
    const { error, data } = await updateTask(id, task)
    if (error) {
      setError("Failed to update todo")
      setAllTodos((prev) => prev.map((t) => (t.id === id ? previousState : t))) // Revert on failure
      return
    }
  }

  const toggleCompleted = async (id: number) => {
    const task = allTodos.find((t) => t.id === id)
    if (!task) {
      return
    }
    const newTask = { ...task, completed: !task.completed }
    editTodo(id, newTask)
  }

  // Delete a todo
  const deleteTodo = async (id: number) => {
    const previousState = allTodos.find((t) => t.id === id)
    if (!previousState) {
      return
    }
    setAllTodos((prev) => prev.filter((t) => t.id !== id))

    const { data, error } = await deleteTask(id)
    if (error || !data) {
      setError("Failed to delete todo")
      setAllTodos((prev) => [...prev, previousState]) // Revert on failure
    }
  }

  return {
    loading,
    error,
    todos: {
      allTodos,
      completedTodos,
      incompletedTodos,
    },
    functions: {
      addTodo,
      deleteTodo,
      toggleCompleted,
    },
  }
}
