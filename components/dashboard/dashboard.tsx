"use client"
import { AppShell, Group, Title, ActionIcon, em } from "@mantine/core"
import { IconLayoutSidebar, IconMessage, IconX } from "@tabler/icons-react"
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
import { useMediaQuery } from "@mantine/hooks"

interface DashboardProps {
  user: User
  signOutFunction: () => void
}

export function Dashboard({ user, signOutFunction }: DashboardProps) {
  const [navbarOpen, { toggle: toggleNavbar }] = useDisclosure(true)
  const [chatOpen, { toggle: toggleChat }] = useDisclosure(false)
  const { loading, error, functions, todos } = useTodos()
  const isMobile = useMediaQuery("(max-width: 40em)")

  const [currentPage, setCurrentPage] = useState<
    "today" | "tasks" | "scheduled" | "completed"
  >("today")

  function setPage(page: "today" | "tasks" | "scheduled" | "completed") {
    console.log(isMobile)
    if (isMobile && navbarOpen) {
      toggleNavbar()
    }
    setCurrentPage(page)
  }

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !navbarOpen, mobile: !navbarOpen },
      }}
      aside={{
        breakpoint: "sm",
        width: 300,
        collapsed: { desktop: !chatOpen, mobile: !chatOpen },
      }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" p="sm" align="center">
          <Group h="100%">
            <ActionIcon onClick={toggleNavbar} variant="subtle">
              <IconLayoutSidebar />
            </ActionIcon>
            <Title order={3}>Taskium</Title>
          </Group>

          <Group>
            <CreateTaskButton addTodo={functions.addTodo} />
            <ActionIcon variant="subtle" onClick={toggleChat}>
              <IconMessage />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="lg">
        <ActionIcon
          onClick={toggleNavbar}
          variant="subtle"
          mb="md"
          hiddenFrom="sm"
        >
          <IconX />
        </ActionIcon>
        <UserButton user={user} signOutFunction={signOutFunction} />
        <Navbar setPageFunction={setPage} currentPage={currentPage} />
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
        <ActionIcon
          onClick={toggleChat}
          variant="subtle"
          mb="md"
          hiddenFrom="sm"
        >
          <IconX />
        </ActionIcon>
        <AiChat />
      </AppShell.Aside>
    </AppShell>
  )
}
