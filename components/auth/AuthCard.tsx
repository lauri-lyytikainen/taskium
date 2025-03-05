import { Box, Card, Group, Title } from "@mantine/core"
import { IconChevronLeft } from "@tabler/icons-react"
import Link from "next/link"
import Image from "next/image"

export function AuthCard({ children }: { children: any }) {
  return (
    <Box
      flex={1}
      w="100vw"
      h="100vh"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Group>
        <Image src="/favicon.svg" alt="Taskium" width="60" height="60" />
        <Title order={3}>Taskium</Title>
      </Group>
      <Card w="min(100%, 30rem)" p="0" mt="md">
        <Box flex={1} p="md">
          <Link
            href="/"
            style={{ color: "inherit", display: "flex", alignItems: "center" }}
          >
            <IconChevronLeft size="20" />
            <span style={{ marginLeft: "0.5rem" }}>Back to home</span>
          </Link>

          {children}
        </Box>
      </Card>
    </Box>
  )
}
