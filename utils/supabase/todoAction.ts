"use server";
import { Task } from "@/types/types";
import { createClient } from "./server";

type TaskResponse =
  | {
      error: null;
      data: Task;
    }
  | { error: string; data: null };

type TaskListResponse =
  | {
      error: null;
      data: Task[];
    }
  | { error: string; data: null };

export async function addTask(newTask: Task): Promise<TaskResponse> {
  const supabase = await createClient();
  const date =
    newTask.due_date == "" || newTask.due_date == "none"
      ? null
      : newTask.due_date;
  const time =
    newTask.due_time == "" || newTask.due_time == "none"
      ? null
      : newTask.due_time;
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      task_name: newTask.task_name,
      due_date: date,
      due_time: time,
      priority: newTask.priority,
      completed: false,
    })
    .select();
  if (error) {
    console.error("Error adding task", error);
    return { error: error.message, data: null };
  }
  return { error: null, data: data[0] as Task };
}

export async function getTasks(): Promise<TaskListResponse> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);
  if (error) {
    console.error("Error fetching tasks", error);
    return { error: error.message, data: null };
  }
  return { error: null, data: data as Task[] };
}

export async function updateTask(
  id: number,
  task: Task
): Promise<TaskResponse> {
  const supabase = await createClient();
  const date =
    task.due_date == "" || task.due_date == "none" ? null : task.due_date;
  const time =
    task.due_time == "" || task.due_time == "none" ? null : task.due_time;
  const { data, error } = await supabase
    .from("tasks")
    .update({
      task_name: task.task_name,
      due_date: date,
      due_time: time,
      priority: task.priority,
      completed: task.completed,
    })
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error updating task", error);
    return { error: error.message, data: null };
  }
  return { error: null, data: data[0] as Task };
}
