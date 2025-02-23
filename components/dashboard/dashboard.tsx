"use client";
import { AppShell, Group, Title, ActionIcon } from "@mantine/core";
import { IconLayoutSidebar, IconMessage } from "@tabler/icons-react";
import { useState } from "react";

import { AiChat } from "@/components/dashboard/AiChat/AiChat";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "@/components/dashboard/Navbar/Navbar";
import { TodayView } from "@/components/dashboard/TodayView/TodayView";
import { UserButton } from "@/components/website/Navbar/UserButton";
import { User } from "@supabase/supabase-js";

interface DashboardProps {
  user: User;
  signOutFunction: () => void;
}

export function Dashboard({ user, signOutFunction }: DashboardProps) {
  const [navbarOpen, { toggle: toggleNavbar }] = useDisclosure();
  const [chatOpen, { toggle: toggleChat }] = useDisclosure();
  const [currentPage, setCurrentPage] = useState<
    "today" | "scheduled" | "completed"
  >("today");

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

          <ActionIcon variant="subtle" onClick={toggleChat} mx="md">
            <IconMessage />
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="lg">
        <UserButton user={user} signOutFunction={signOutFunction} />
        <Navbar setPageFunction={setCurrentPage} currentPage={currentPage} />
      </AppShell.Navbar>
      <AppShell.Main>
        {
          {
            today: <TodayView />,
            scheduled: <p>Scheduled</p>,
            completed: <p>Completed</p>,
          }[currentPage]
        }
      </AppShell.Main>
      <AppShell.Aside p="md">
        <AiChat />
      </AppShell.Aside>
    </AppShell>
  );
}
