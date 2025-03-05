import {
  Stack,
  Title,
  ScrollArea,
  Flex,
  Paper,
  Text,
  Group,
  Textarea,
  Button,
} from "@mantine/core"

const log = [
  {
    type: "ai",
    message: "Greeting from the AI assistant",
  },
  {
    type: "user",
    message: "Message from the user",
  },
  {
    type: "ai",
    message:
      "Another message from the AI assistant that is a bit longer to test the text wrapping of the chat windows and chat bubbles",
  },
  {
    type: "user",
    message: "Short one",
  },
]

function aiMessage(message: string, index: number) {
  return (
    <Paper
      p="sm"
      maw="70%"
      shadow="0"
      bg="var(--mantine-primary-color-light)"
      style={{ alignSelf: "flex-start" }}
      key={index}
    >
      <Text c="var(--mantine-primary-color-text">{message}</Text>
    </Paper>
  )
}
function userMessage(message: string, index: number) {
  return (
    <Paper
      p="sm"
      maw="70%"
      shadow="0"
      bg="var(--mantine-primary-color-filled)"
      style={{ alignSelf: "flex-end" }}
      key={index}
    >
      <Text c="var(--mantine-primary-color-contrast">{message}</Text>
    </Paper>
  )
}

export function AiChat() {
  return (
    <Stack h="100%" gap="md">
      <Title order={3}>Chat</Title>
      <ScrollArea type="auto" h="100%" offsetScrollbars>
        <Flex direction="column" gap="md" w="100%">
          {log.map((item, index) =>
            item.type === "ai"
              ? aiMessage(item.message, index)
              : userMessage(item.message, index)
          )}
        </Flex>
      </ScrollArea>
      <Group flex="1" align="end">
        <Textarea placeholder="Type your message" flex={1} autosize />
        <Button>Send</Button>
      </Group>
    </Stack>
  )
}
