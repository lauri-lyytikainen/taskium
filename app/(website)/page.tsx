import {
  AppShell,
  Button,
  Burger,
  Skeleton,
  Group,
  Text,
  Title,
  Avatar,
} from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <Link href="/dashboard">
      <Button>Go to dashboard</Button>
    </Link>
  );
}
