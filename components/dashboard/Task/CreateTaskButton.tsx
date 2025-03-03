"use client";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { parseTextToTask } from "@/utils/llm/llm";
import {
  Button,
  Card,
  Modal,
  Stack,
  Textarea,
  Text,
  Pill,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { TaskPreview } from "@/types/types";
import {
  getFormattedDateToday,
  getFormattedDayStringWithString,
} from "@/utils/time/time";

export function CreateTaskButton({
  addTodo,
}: {
  addTodo: (task: TaskPreview) => void;
}) {
  const [taskModalOpen, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [currentDate] = useState(getFormattedDateToday());
  const [taskPreview, setTaskPreview] = useState<TaskPreview>({
    taskName: "",
    dueDate: "",
    dueTime: "",
    priority: 0,
    error: "none",
  });
  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    setTaskPreview(await parseTextToTask(query));
    setLoading(false);
  }, 500);

  function addTask() {
    addTodo(taskPreview);
    close();
  }

  return (
    <>
      <Modal opened={taskModalOpen} onClose={close} title="Add new task">
        <Stack>
          <Textarea
            placeholder="Task description"
            label="Task"
            description="Describe your task"
            autosize
            onChange={(e) => handleSearch(e.currentTarget.value)}
            error={taskPreview.error != "none" ? taskPreview.error : null}
          />
          <Card shadow="0">
            <LoadingOverlay visible={loading} />
            <Stack>
              <Text>
                {taskPreview.taskName
                  ? taskPreview.taskName
                  : "Start typing to see a preview"}
              </Text>
              <Text>
                Due to{" "}
                <Pill
                  bg="var(--mantine-primary-color-filled)"
                  c="var(--mantine-primary-color-contrast)"
                  size="md"
                >
                  {taskPreview.dueDate
                    ? getFormattedDayStringWithString(taskPreview.dueDate)
                    : "No date"}
                </Pill>
                {taskPreview.dueTime && (
                  <>
                    {" at "}
                    <Pill
                      bg="var(--mantine-primary-color-filled)"
                      c="var(--mantine-primary-color-contrast)"
                      size="md"
                    >
                      {taskPreview.dueTime}
                    </Pill>
                  </>
                )}
              </Text>

              <Text>
                Priority{" "}
                <Pill
                  bg="var(--mantine-primary-color-filled)"
                  c="var(--mantine-primary-color-contrast)"
                  size="md"
                >
                  {["Low", "Medium", "High", "Urgent"][taskPreview.priority]}
                </Pill>
              </Text>
            </Stack>
          </Card>
          <Button
            disabled={taskPreview.taskName == "" || taskPreview.error != "none"}
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
            dueDate: "",
            dueTime: "",
            priority: 0,
            error: "",
          });
          open();
        }}
      >
        New task
      </Button>
    </>
  );
}
