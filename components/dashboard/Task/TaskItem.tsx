import { Task } from "@/types/types";
import { Checkbox, Group, Pill, Text } from "@mantine/core";

interface TaskItemProps {
  task: Task;
  onCheck: (id: number) => void;
  onRemove: () => void;
}

export function TaskItem({ task, onCheck, onRemove }: TaskItemProps) {
  return (
    <Group justify="space-between" h="40">
      <Group>
        <Checkbox
          radius="sm"
          size="md"
          checked={task.completed}
          onChange={() => {
            onCheck(task.id);
          }}
        />
        <Text td={task.completed ? "line-through" : ""}>{task.task_name}</Text>
      </Group>
      <Group>
        <Text>{task.due_time}</Text>
        <Pill
          bg="var(--mantine-primary-color-filled)"
          c="var(--mantine-primary-color-contrast)"
        >
          {["Low", "Medium", "High", "Urgent"][task.priority]}
        </Pill>
      </Group>
    </Group>
  );
}
