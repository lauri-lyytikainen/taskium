import { Stack, Button, Group, Title } from "@mantine/core";
import {
  IconCalendarWeek,
  IconBolt,
  IconSquareCheck,
} from "@tabler/icons-react";
import Link from "next/link";

interface NavBarProps {
  setPageFunction: React.Dispatch<
    React.SetStateAction<"tasks" | "calendar" | "completed">
  >;
  currentPage: "tasks" | "calendar" | "completed";
}

function NavButton(
  title: string,
  icon: any,
  func: () => void,
  selected: boolean
) {
  return (
    <Button
      justify="space-between"
      variant={selected ? "filled" : "subtle"}
      fullWidth
      onClick={func}
    >
      <Group>
        {icon}
        {title}
      </Group>
    </Button>
  );
}

export function Navbar({ setPageFunction, currentPage }: NavBarProps) {
  return (
    <Stack gap="xs" mt="md">
      <Title order={3}>Your workspace</Title>
      {NavButton(
        "Tasks",
        <IconBolt size="20" />,
        () => setPageFunction("tasks"),
        currentPage === "tasks"
      )}
      {NavButton(
        "Calendar",
        <IconCalendarWeek size="20" />,
        () => setPageFunction("calendar"),
        currentPage === "calendar"
      )}
      {NavButton(
        "Completed",
        <IconSquareCheck size="20" />,
        () => setPageFunction("completed"),
        currentPage === "completed"
      )}
    </Stack>
  );
}
