"use client"

import {
  Button,
  Avatar,
  Group,
  Menu,
  MenuItem,
  MenuTarget,
  MenuDropdown,
  MenuLabel,
} from "@mantine/core"
import {
  IconChevronDown,
  IconUser,
  IconSettings,
  IconLogout,
  IconHome,
  IconLayoutDashboard,
} from "@tabler/icons-react"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

interface UserButtonProps {
  user: User
  signOutFunction: () => void
}

export function UserButton({ user, signOutFunction }: UserButtonProps) {
  const name = user.user_metadata.name || user.email
  const router = useRouter()

  return (
    <Menu width={200} position="bottom-end">
      <MenuTarget>
        <Button
          variant="subtle"
          justify="space-between"
          rightSection={<IconChevronDown size={20} />}
        >
          <Group>
            <Avatar
              name={name}
              size={"sm"}
              src={user.user_metadata.avatar_url || ""}
            />
            {name}
          </Group>
        </Button>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>Navigation</MenuLabel>
        <MenuItem
          leftSection={<IconHome size={20} />}
          onClick={() => router.push("/")}
        >
          Home page
        </MenuItem>
        <MenuItem
          leftSection={<IconLayoutDashboard size={20} />}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard page
        </MenuItem>
        <MenuLabel>Options</MenuLabel>
        <MenuItem leftSection={<IconUser size={20} />} disabled>
          Account
        </MenuItem>
        <MenuItem leftSection={<IconSettings size={20} />} disabled>
          Settings
        </MenuItem>
        <MenuItem
          leftSection={<IconLogout size={20} />}
          color="red"
          onClick={signOutFunction}
        >
          Logout
        </MenuItem>
      </MenuDropdown>
    </Menu>
  )
}
