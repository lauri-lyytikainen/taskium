"use client"
import { useDisclosure } from "@mantine/hooks"
import { IconPlus } from "@tabler/icons-react"
import { parseTextToTask } from "@/utils/llm/llm"
import {
  Button,
  Card,
  Modal,
  Stack,
  Textarea,
  Text,
  Pill,
  LoadingOverlay,
  TextInput,
  Group,
  Select,
  Switch,
  Loader,
} from "@mantine/core"
import { useState } from "react"
import { useDebouncedCallback } from "@mantine/hooks"
import { TaskPreview } from "@/types/types"
import { getFormattedDateToday, getFormattedDayString } from "@/utils/time/time"
import { DateInput, TimeInput } from "@mantine/dates"

export function CreateTaskButton({
  addTodo,
}: {
  addTodo: (task: TaskPreview) => void
}) {
  const [taskModalOpen, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const [useAi, setUseAi] = useState(false)
  const [currentDate] = useState(getFormattedDateToday())
  const [taskPreview, setTaskPreview] = useState<TaskPreview>({
    taskName: "",
    dueDate: null,
    dueTime: null,
    priority: 0,
    error: "",
  })
  const handleSearch = useDebouncedCallback(async (query: string) => {
    setTaskPreview(await parseTextToTask(query))
    setLoading(false)
  }, 500)

  function addTask() {
    addTodo(taskPreview)
    close()
  }

  function handleChange(e: any) {
    setTaskPreview({
      ...taskPreview,
      taskName: e.currentTarget.value,
    })
    if (useAi) {
      setLoading(true)
      handleSearch(e.currentTarget.value)
    }
  }

  return (
    <>
      <Modal opened={taskModalOpen} onClose={close} title="Add new task">
        <Stack>
          <Stack>
            <Textarea
              placeholder="Task description"
              label="Task"
              description="Describe your task"
              autosize
              onChange={(e) => handleChange(e)}
              error={taskPreview.error != "none" ? taskPreview.error : null}
              rightSection={
                <Switch
                  label="Use AI"
                  labelPosition="left"
                  checked={useAi}
                  onChange={(e) => {
                    setUseAi(e.currentTarget.checked)
                  }}
                />
              }
              rightSectionWidth={120}
            />
            {useAi && (
              <>
                <Text size="xs" fw="700">
                  Smart task preview:
                </Text>
                {loading ? (
                  <Loader size="xs" />
                ) : (
                  <Text>{taskPreview.taskName}</Text>
                )}
              </>
            )}
          </Stack>
          <Group flex={1}>
            <DateInput
              value={taskPreview.dueDate}
              label="Due date"
              placeholder="When is it due?"
              onChange={(date) => {
                setTaskPreview({
                  ...taskPreview,
                  dueDate: date,
                })
              }}
              highlightToday
              clearable
              flex={1}
            />
            <TimeInput
              label="Due time"
              placeholder="What time is it due?"
              onChange={(time) => {
                setTaskPreview({
                  ...taskPreview,
                  dueTime: time.currentTarget.value,
                })
              }}
              value={taskPreview.dueTime || ""}
              flex={1}
            />
          </Group>
          <Group>
            <Select
              label="Priority"
              data={[
                { value: "0", label: "Low" },
                { value: "1", label: "Medium" },
                { value: "2", label: "High" },
                { value: "3", label: "Urgent" },
              ]}
              value={taskPreview.priority.toString()}
              onChange={(value) => {
                setTaskPreview({
                  ...taskPreview,
                  priority: value ? (parseInt(value) as 0 | 1 | 2 | 3) : 0,
                })
              }}
            />
          </Group>

          <Button
            disabled={
              taskPreview.taskName == "" ||
              (taskPreview.error != "none" &&
                taskPreview.error != "" &&
                taskPreview.error != null)
            }
            loading={loading}
            onClick={addTask}
          >
            Add task
          </Button>
        </Stack>
      </Modal>
      <Button
        leftSection={<IconPlus size={20} />}
        onClick={() => {
          setTaskPreview({
            taskName: "",
            dueDate: null,
            dueTime: null,
            priority: 0,
            error: "",
          })
          open()
        }}
      >
        New task
      </Button>
    </>
  )
}
