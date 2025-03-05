import { notifications } from "@mantine/notifications"

export function errorNotification(message: string) {
  notifications.show({
    title: "Error",
    message,
    color: "red",
  })
}

export function successNotification(message: string) {
  notifications.show({
    title: "Success",
    message,
    color: "green",
  })
}
