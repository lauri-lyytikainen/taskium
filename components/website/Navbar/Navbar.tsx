"use server";

import { Button, Container, Group, Title, Box } from "@mantine/core";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "./UserButton";
import Image from "next/image";

export async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  return (
    <Box py="md">
      <Container size="xl">
        <Group justify="space-between">
          <Group>
            <Image src="/favicon.svg" alt="Taskium" height="60" width="60" />
            <Title>Taskium</Title>
          </Group>
          {user ? (
            <>
              <Group>
                <Link href={"/dashboard"}>
                  <Button>Dashboard</Button>
                </Link>
                <UserButton user={user} signOutFunction={signOut} />
              </Group>
            </>
          ) : (
            <Group>
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="default">Sign Up</Button>
              </Link>
            </Group>
          )}
        </Group>
      </Container>
    </Box>
  );
}
