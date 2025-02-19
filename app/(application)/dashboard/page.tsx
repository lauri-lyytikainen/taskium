"use client";
import {
  AppShell,
  Button,
  Skeleton,
  Group,
  Title,
  Avatar,
  ActionIcon,
  Divider,
} from "@mantine/core";
import {
  IconLayoutSidebar,
  IconMessage,
  IconChevronDown,
} from "@tabler/icons-react";
import { useState } from "react";

import { AiChat } from "../../../components/dashboard/AiChat/AiChat";
import { useDisclosure } from "@mantine/hooks";
import { NavBar } from "../../../components/dashboard/NavBar.tsx/NavBar";
import { TodayView } from "../../../components/dashboard/TodayView/TodayView";

export default function Page() {
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
        width: 400,
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
        <Group mb="md">
          <Button
            variant="subtle"
            fullWidth
            justify="space-between"
            rightSection={<IconChevronDown size={20} />}
          >
            <Group>
              <Avatar name="YN" size={"sm"} />
              Your Name
            </Group>
          </Button>
        </Group>
        <NavBar setPageFunction={setCurrentPage} currentPage={currentPage} />
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
