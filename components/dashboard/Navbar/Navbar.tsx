import { Stack, Button, Group, Title } from "@mantine/core"
import {
  IconCalendarWeek,
  IconBolt,
  IconSquareCheck,
  IconSun,
} from "@tabler/icons-react"
import Link from "next/link"

interface NavBarProps {
  setPageFunction: React.Dispatch<
    React.SetStateAction<"today" | "tasks" | "scheduled" | "completed">
  >
  currentPage: "today" | "tasks" | "scheduled" | "completed"
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
  )
}

export function Navbar({ setPageFunction, currentPage }: NavBarProps) {
  return (
    <Stack gap="xs" mt="md">
      <Title order={3}>Your workspace</Title>
      {NavButton(
        "Today",
        <IconSun size="20" />,
        () => setPageFunction("today"),
        currentPage === "today"
      )}
      {NavButton(
        "Tasks",
        <IconBolt size="20" />,
        () => setPageFunction("tasks"),
        currentPage === "tasks"
      )}
      {NavButton(
        "Scheduled",
        <IconCalendarWeek size="20" />,
        () => setPageFunction("scheduled"),
        currentPage === "scheduled"
      )}
      {NavButton(
        "Completed",
        <IconSquareCheck size="20" />,
        () => setPageFunction("completed"),
        currentPage === "completed"
      )}
    </Stack>
  )
}
