import { Title, Text, Divider, Loader, Center, Stack } from "@mantine/core"
import { Task, ViewProps } from "@/types/types"
import { TaskItem } from "../Task/TaskItem"

export function CompletedView({ loading, error, todos, functions }: ViewProps) {
  const tasks = todos.completedTodos

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
          {tasks.length > 0 && (
            <div>
              <Title order={2}>
                {" "}
                {tasks.length} completed {tasks.length == 1 ? "Task" : "Tasks"}
              </Title>
              <Stack gap="xs">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} functions={functions} />
                ))}
              </Stack>
            </div>
          )}
        </>
      )}
    </>
  )
}
