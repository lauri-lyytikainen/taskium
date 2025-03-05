"use client"

import {
  Group,
  Stack,
  Title,
  Button,
  Divider,
  TextInput,
  PasswordInput,
  LoadingOverlay,
  Center,
} from "@mantine/core"
import { AuthCard } from "./AuthCard"
import Image from "next/image"
import {
  IconBrandGoogle,
  IconBrandNotion,
  IconMail,
  IconPassword,
} from "@tabler/icons-react"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { login, loginGoogle } from "@/utils/supabase/authAction"
import Link from "next/link"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({
    mode: "uncontrolled",
    onSubmitPreventDefault: "always",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
      password: (value) =>
        value.length >= 6
          ? null
          : "Password is too short (minimum 6 characters)",
    },
  })

  function submitForm(values: { email: string; password: string }) {
    setIsLoading(true)
    login(values.email, values.password).then((response) => {
      if (response.error) {
        form.setErrors({
          email: "Invalid credentials",
          password: "Invalid credentials",
        })
        setIsLoading(false)
        return
      }
    })
  }

  function loginWithGoogle() {
    setIsLoading(true)
    loginGoogle().then((response) => {
      setIsLoading(false)
      if (response.error) {
        return
      }
      if (response.redirect) {
        window.location.href = response.redirect
      }
    })
  }

  return (
    <AuthCard>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Stack>
        <Center>
          <Image
            src="/illustrations/login.svg"
            alt="Mail Sent"
            width="0"
            height="0"
            style={{ width: "50%", height: "auto" }}
          />
        </Center>
        <Title ta="center">Login</Title>
        <Group>
          <Button
            flex={1}
            variant="default"
            leftSection={<IconBrandGoogle size={20} />}
            onClick={() => loginWithGoogle()}
          >
            Google
          </Button>
          <Button
            flex={1}
            variant="default"
            leftSection={<IconBrandNotion size={20} />}
            disabled
          >
            Notion
          </Button>
        </Group>
        <Divider label="or continue with email" />
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <Stack>
            <TextInput
              autoComplete="email"
              leftSection={<IconMail size={20} />}
              label="Your email"
              placeholder="Your email"
              name="email"
              key={form.key("email")}
              {...form.getInputProps("email")}
              disabled={isLoading}
            />
            <PasswordInput
              autoComplete="current-password"
              leftSection={<IconPassword size={20} />}
              label="Password"
              placeholder="Your password"
              name="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
              disabled={isLoading}
            />
            <Link href="/auth/recover" style={{ color: "inherit" }}>
              Forgot password?
            </Link>
            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Stack>
    </AuthCard>
  )
}
