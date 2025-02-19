import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTd,
  TableTbody,
  Title,
} from "@mantine/core";
import { Task } from "../../Task/Task";

export function TodayView() {
  return (
    <>
      <Title>Today</Title>
      <Task />
      <Task />
      <Task />
      <Task />
    </>
  );
}
