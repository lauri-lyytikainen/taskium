"use server"
import { Groq } from "groq-sdk"
import { taskPrompt } from "./prompts/taskPrompt"
import { TaskPreview } from "@/types/types"
import { getFormattedDateToday, getFormattedTime } from "../time/time"

const key = process.env.GROQ_API_KEY

const groq = new Groq({ apiKey: key })

export async function parseTextToTask(message: string): Promise<TaskPreview> {
  const dateString = getFormattedDateToday() + " " + getFormattedTime()
  const messageString = message + ", today is: " + dateString
  const chatCompletion = await getGroqChatCompletion(messageString)

  const response = JSON.parse(
    chatCompletion.choices[0]?.message?.content || "{}"
  )

  return {
    taskName: response?.task_name || "",
    dueDate: response?.due_date ? new Date(response?.due_date) : null,
    dueTime: response?.due_time ? response?.due_time : null,
    priority: response?.priority || 0,
    error: response?.error || "",
  } as TaskPreview
}

export async function getGroqChatCompletion(message: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: taskPrompt.prompt,
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    response_format: {
      type: "json_object",
    },
    stop: null,
  })
}
