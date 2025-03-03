import { Title, Text, Divider, Loader, Center } from "@mantine/core";
import { Task } from "@/types/types";
import { TaskItem } from "../Task/TaskItem";
import {
  getFormattedDateToday,
  getFormattedDateTomorrow,
  getFormattedDayStringWithString,
} from "@/utils/time/time";

interface TaskViewProps {
  todos: Task[];
  loading: boolean;
  error: string | null;
  toggleCompleted: (id: number) => void;
}

export function TaskView({
  todos,
  loading,
  error,
  toggleCompleted,
}: TaskViewProps) {
  const today = getFormattedDateToday();
  const tomorrow = getFormattedDateTomorrow();

  // Sort tasks by due date and checked status
  const groupedTodos = todos.reduce((groups, todo) => {
    const date = todo.due_date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {} as Record<string, Task[]>);

  const pastDueTodos = Object.keys(groupedTodos)
    .filter((date) => new Date(date) < new Date(today))
    .reduce((acc, date) => {
      acc.push(...groupedTodos[date]);
      delete groupedTodos[date];
      return acc;
    }, [] as Task[])
    .sort(
      (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    )
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
  // Sort tasks within each group by completed status
  Object.keys(groupedTodos).forEach((date) => {
    groupedTodos[date].sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
  });
  const sortedDates = Object.keys(groupedTodos).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <>
          {pastDueTodos.length > 0 && (
            <div>
              <Title order={2} c="red">
                Past Due
              </Title>
              {pastDueTodos.map((todo) => (
                <TaskItem
                  key={todo.id}
                  task={todo}
                  onCheck={toggleCompleted}
                  onRemove={() => {}}
                />
              ))}
              <Divider my="md" />
            </div>
          )}
          {sortedDates.length > 0 ? (
            sortedDates.map((date) => (
              <div key={date}>
                <Title order={2}>{getFormattedDayStringWithString(date)}</Title>
                {groupedTodos[date].map((todo) => (
                  <TaskItem
                    key={todo.id}
                    task={todo}
                    onCheck={toggleCompleted}
                    onRemove={() => {}}
                  />
                ))}
                <Divider my="md" />
              </div>
            ))
          ) : (
            <Text>No tasks for today</Text>
          )}
        </>
      )}
    </>
  );
}
