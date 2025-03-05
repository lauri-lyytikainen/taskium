import { Title, Text, Divider, Loader, Center, Stack } from "@mantine/core"
import { Task, ViewProps } from "@/types/types"
import { TaskItem } from "../Task/TaskItem"
import {
  getTodayDate,
  getFormattedDayStringWithString,
} from "@/utils/time/time"

export function ScheduledView({ loading, error, todos, functions }: ViewProps) {
  const tasks = todos.incompletedTodos
  const today = getTodayDate()

  // Sort tasks by due date and checked status
  const groupedTodos = tasks.reduce(
    (groups, task) => {
      const date = task.due_date ? task.due_date?.toString() : "null"
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(task)
      return groups
    },
    {} as Record<string, Task[]>
  )

  const pastDueTodos = Object.keys(groupedTodos)
    .filter((date) => new Date(date) < today)
    .reduce((acc, date) => {
      acc.push(...groupedTodos[date])
      delete groupedTodos[date]
      return acc
    }, [] as Task[])
    .sort(
      (a, b) =>
        new Date(a.due_date || 0).getTime() -
        new Date(b.due_date || 0).getTime()
    )
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
  // Sort tasks within each group by completed status
  Object.keys(groupedTodos).forEach((date) => {
    groupedTodos[date].sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    )
  })
  if (groupedTodos["null"]) {
    delete groupedTodos["null"]
  }
  const sortedDates = Object.keys(groupedTodos).sort((a, b) => {
    if (!a) return 1
    if (!b) return -1
    return new Date(a).getTime() - new Date(b).getTime()
  })
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
                {pastDueTodos.map((task) => (
                  <TaskItem key={task.id} task={task} functions={functions} />
                ))}
              </Stack>
              <Divider my="md" />
            </div>
          )}

          {sortedDates.length > 0 &&
            sortedDates.map((date) => (
              <div key={date}>
                <Title order={2}>{getFormattedDayStringWithString(date)}</Title>
                <Stack gap="xs">
                  {groupedTodos[date].map((task) => (
                    <TaskItem key={task.id} task={task} functions={functions} />
                  ))}
                </Stack>
                <Divider my="md" />
              </div>
            ))}
        </>
      )}
    </>
  )
}
