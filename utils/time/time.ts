function getFormattedDate(date: Date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
}
export function getFormattedDateToday() {
  return getFormattedDate(new Date());
}

export function getFormattedDateTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return getFormattedDate(date);
}

export function getFormattedTime() {
  const dateObj = new Date();
  return dateObj.getHours() + ":" + dateObj.getMinutes();
}

export function getFormattedDayString(date: Date) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return formattedDate;
  }
}

export function getFormattedDayStringWithString(str: string) {
  const date = new Date(str);
  return getFormattedDayString(date);
}
