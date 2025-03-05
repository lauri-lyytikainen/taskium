import { TaskItemProps } from "@/types/types"
import {
  Checkbox,
  Group,
  Pill,
  Text,
  Card,
  Stack,
  ActionIcon,
  Menu,
} from "@mantine/core"
import { IconDots, IconSun, IconTrash, IconPencil } from "@tabler/icons-react"

export function TaskItem({ task, functions }: TaskItemProps) {
  return (
    <Card p="sm" shadow="xs">
      <Group justify="space-between" h="40">
        <Group>
          <Checkbox
            radius="sm"
            size="md"
            checked={task.completed}
            onChange={() => {
              functions.toggleCompleted(task.id)
            }}
          />
          <Stack gap="0">
            <Text td={task.completed ? "line-through" : ""}>
              {task.task_name}
            </Text>

            <Text size="xs">{task.due_time}</Text>
          </Stack>
        </Group>
        <Group>
          <Pill
            bg="var(--mantine-primary-color-filled)"
            c="var(--mantine-primary-color-contrast)"
          >
            {["Low", "Medium", "High", "Urgent"][task.priority]}
          </Pill>
          <Menu position="bottom-end" withArrow>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDots size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPencil size={20} />} disabled>
                Edit
              </Menu.Item>
              <Menu.Item leftSection={<IconSun size={20} />} disabled>
                Add to Today
              </Menu.Item>
              <Menu.Item
                onClick={() => functions.deleteTodo(task.id)}
                leftSection={<IconTrash size={20} />}
                c="red"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Card>
  )
}
