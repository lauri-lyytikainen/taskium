import { Title, Text, Divider, Loader, Center, Stack } from "@mantine/core"
import { Task, ViewProps } from "@/types/types"
import { TaskItem } from "../Task/TaskItem"
import { getTodayDate } from "@/utils/time/time"

export function TodayView({ loading, error, functions, todos }: ViewProps) {
  const tasks = todos.incompletedTodos
  const today = getTodayDate()
  const filteredTodos = tasks.filter(
    (task) => task.due_date && new Date(task.due_date) <= today
  )
  const pastDueTodos = filteredTodos.filter(
    (task) => task.due_date && new Date(task.due_date) < today
  )
  const todayTodos = filteredTodos.filter(
    (task) => task.due_date && new Date(task.due_date) >= today
  )

  return (
    <>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <>
          {pastDueTodos.length > 0 && (
            <div>
              <Title order={2} c="red">
                Past Due
              </Title>
              <Stack gap="xs">
                {pastDueTodos.map((todo) => (
                  <TaskItem key={todo.id} task={todo} functions={functions} />
                ))}
              </Stack>
              <Divider my="md" />
            </div>
          )}

          {todayTodos.length > 0 ? (
            <div>
              <Title order={2}>
                {todayTodos.length} {todayTodos.length == 1 ? "Task" : "Tasks"}{" "}
                for today
              </Title>
              <Stack gap="xs">
                {todayTodos.map((todo) => (
                  <TaskItem key={todo.id} task={todo} functions={functions} />
                ))}
              </Stack>
            </div>
          ) : (
            <Text>No tasks for today</Text>
          )}
        </>
      )}
    </>
  )
}
