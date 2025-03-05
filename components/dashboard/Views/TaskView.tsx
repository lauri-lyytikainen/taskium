import { Title, Text, Divider, Loader, Center, Stack } from "@mantine/core"
import { Task, ViewProps } from "@/types/types"
import { TaskItem } from "../Task/TaskItem"

export function TaskView({ loading, error, todos, functions }: ViewProps) {
  const tasks = todos.incompletedTodos

  const filteredTodos = tasks.filter((task) => !task.due_date)

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
          {filteredTodos.length > 0 && (
            <div>
              <Title order={2}>These tasks have no due date</Title>
              <Stack gap="xs">
                {filteredTodos.map((todo) => (
                  <TaskItem key={todo.id} task={todo} functions={functions} />
                ))}
              </Stack>
            </div>
          )}
        </>
      )}
    </>
  )
}
