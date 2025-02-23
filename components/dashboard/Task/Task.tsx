import { Checkbox, Group, Pill, Text } from "@mantine/core";

export function Task() {
  return (
    <Group justify="space-between" h="40">
      <Group>
        <Checkbox radius="sm" size="md" />
        <Text>Task name</Text>
      </Group>
      <Group>
        <Text>Today 10:00</Text>
        <Pill
          bg="var(--mantine-primary-color-filled)"
          c="var(--mantine-primary-color-contrast)"
        >
          Normal
        </Pill>
      </Group>
    </Group>
  );
}
