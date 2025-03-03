import { useState, useEffect } from "react";
import { TaskPreview } from "@/types/types";
import { Task } from "@/types/types";
import { addTask, getTasks, updateTask } from "../supabase/todoAction";

export function useTodos() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Todos
  useEffect(() => {
    async function fetchTodos() {
      getTasks().then((response) => {
        if (response.error) {
          setError("Failed to load todos");
        } else {
          if (response.data) {
            setTodos(response.data);
          }
        }
        setLoading(false);
      });
    }
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (taskPreview: TaskPreview) => {
    const newTask = {
      id: -1,
      created_at: "",
      user_id: "",
      task_name: taskPreview.taskName,
      due_date: taskPreview.dueDate,
      due_time: taskPreview.dueTime,
      priority: taskPreview.priority,
      completed: false,
    } as Task;

    // Update UI first (Optimistic update)
    setTodos((prev) => [...prev, newTask]);

    const { error, data } = await addTask(newTask);
    if (error) {
      setError("Failed to add todo");
      setTodos((prev) => prev.filter((t) => t.id !== newTask.id)); // Revert on failure
      return;
    }
    // Set the ID of the new task
    if (data) {
      setTodos((prev) =>
        prev.map((t) => (t.id === -1 ? { ...t, id: data.id } : t))
      );
    }
  };

  const editTodo = async (id: number, task: Task) => {
    const previousState = todos.find((t) => t.id === id);
    if (!previousState) {
      return;
    }
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...task } : t)));
    const { error, data } = await updateTask(id, task);
    console.log(error, data);
    if (error) {
      setError("Failed to update todo");
      setTodos((prev) => prev.map((t) => (t.id === id ? previousState : t))); // Revert on failure
      return;
    }
  };

  const toggleCompleted = async (id: number) => {
    const task = todos.find((t) => t.id === id);
    if (!task) {
      return;
    }
    const newTask = { ...task, completed: !task.completed };
    editTodo(id, newTask);
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return { todos, loading, error, addTodo, deleteTodo, toggleCompleted };
}
