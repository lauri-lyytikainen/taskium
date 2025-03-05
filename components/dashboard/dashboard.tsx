"use client"
import { AppShell, Group, Title, ActionIcon } from "@mantine/core"
import { IconLayoutSidebar, IconMessage } from "@tabler/icons-react"
import { useState } from "react"

import { AiChat } from "@/components/dashboard/AiChat/AiChat"
import { useDisclosure } from "@mantine/hooks"
import { Navbar } from "@/components/dashboard/Navbar/Navbar"
import { ScheduledView } from "@/components/dashboard/Views/ScheduledView"
import { UserButton } from "@/components/website/Navbar/UserButton"
import { User } from "@supabase/supabase-js"

import { CreateTaskButton } from "./Task/CreateTaskButton"
import { useTodos } from "@/utils/todos/todos"
import { TodayView } from "./Views/TodayView"
import { TaskView } from "./Views/TaskView"
import { CompletedView } from "./Views/CompletedView"

interface DashboardProps {
  user: User
  signOutFunction: () => void
}

export function Dashboard({ user, signOutFunction }: DashboardProps) {
  const [navbarOpen, { toggle: toggleNavbar }] = useDisclosure()
  const [chatOpen, { toggle: toggleChat }] = useDisclosure(true)
  const { loading, error, functions, todos } = useTodos()

  const [currentPage, setCurrentPage] = useState<
    "today" | "tasks" | "scheduled" | "completed"
  >("today")

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: navbarOpen },
      }}
      aside={{
        breakpoint: "sm",
        width: 300,
        collapsed: { desktop: chatOpen },
      }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" p="0">
          <Group h="100%" px="md">
            <ActionIcon onClick={toggleNavbar} variant="subtle">
              <IconLayoutSidebar />
            </ActionIcon>
            <Title order={3}>Taskium</Title>
          </Group>

          <Group>
            <CreateTaskButton addTodo={functions.addTodo} />
            <ActionIcon variant="subtle" onClick={toggleChat} mx="md">
              <IconMessage />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="lg">
        <UserButton user={user} signOutFunction={signOutFunction} />
        <Navbar setPageFunction={setCurrentPage} currentPage={currentPage} />
      </AppShell.Navbar>
      <AppShell.Main>
        {
          {
            today: (
              <TodayView
                loading={loading}
                error={error}
                functions={functions}
                todos={todos}
              />
            ),
            tasks: (
              <TaskView
                loading={loading}
                error={error}
                functions={functions}
                todos={todos}
              />
            ),
            scheduled: (
              <ScheduledView
                loading={loading}
                error={error}
                functions={functions}
                todos={todos}
              />
            ),
            completed: (
              <CompletedView
                loading={loading}
                error={error}
                functions={functions}
                todos={todos}
              />
            ),
          }[currentPage]
        }
      </AppShell.Main>
      <AppShell.Aside p="md">
        <AiChat />
      </AppShell.Aside>
    </AppShell>
  )
}
