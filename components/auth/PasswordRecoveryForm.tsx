"use client";

import { useState } from "react";
import {
  Button,
  Center,
  TextInput,
  Title,
  Text,
  Stack,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { errorNotification } from "@/utils/notifications/notifications";
import { recover } from "@/utils/supabase/authAction";
import { AuthCard } from "./AuthCard";
import Image from "next/image";
import { IconMail } from "@tabler/icons-react";

export function PasswordRecoveryForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    onSubmitPreventDefault: "always",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
    },
  });

  function submitForm(values: { email: string }) {
    setIsLoading(true);
    recover(values.email).then((response) => {
      if (response.error) {
        errorNotification(response.error.message);
        setIsLoading(false);
        return;
      }
      setEmail(values.email);
      setIsLoading(false);
    });
  }

  return (
    <AuthCard>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {!email ? (
        <Box>
          <Center>
            <Image
              src="/illustrations/password.svg"
              alt="Mail Sent"
              width="0"
              height="0"
              style={{ width: "30%", height: "auto" }}
            />
          </Center>
          <Title order={1} ta="center">
            Recover password
          </Title>
          <Text>
            Enter your email address and we will send you a link to recover your
            password
          </Text>
          <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            <TextInput
              leftSectionPointerEvents="none"
              autoComplete="email"
              leftSection={<IconMail size={20} />}
              label="Your email"
              placeholder="Your email"
              name="email"
              key={form.key("email")}
              {...form.getInputProps("email")}
              disabled={isLoading}
            />

            <Button fullWidth type="submit" mt="md" disabled={isLoading}>
              Send a password recovery link
            </Button>
          </form>
        </Box>
      ) : (
        <Stack align="center">
          <Image
            src="/illustrations/mailSent.svg"
            alt="Mail Sent"
            width="0"
            height="0"
            style={{ width: "30%", height: "auto" }}
          />
          <Title ta="center">Email sent</Title>
          <Text ta="center">
            We have sent a password recovery link to to{" "}
            <a href={`mailto:${email}`} style={{ color: "inherit" }}>
              {email}
            </a>
            . After receiving the email, follow the link to change your
            password.
          </Text>
          <Text>You can close this window now!</Text>
        </Stack>
      )}
    </AuthCard>
  );
}
