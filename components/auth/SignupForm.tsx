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
  Checkbox,
  Text,
  Center,
} from "@mantine/core"
import Link from "next/link"
import { AuthCard } from "./AuthCard"
import {
  IconBrandGoogle,
  IconBrandNotion,
  IconMail,
  IconPassword,
  IconUser,
} from "@tabler/icons-react"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { signup, loginGoogle } from "@/utils/supabase/authAction"
import { errorNotification } from "../../utils/notifications/notifications"
import Image from "next/image"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const form = useForm({
    mode: "uncontrolled",
    onSubmitPreventDefault: "always",
    initialValues: {
      name: "",
      email: "",
      password: "",
      acceptTerms: false,
    },

    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
      password: (value) =>
        value.length >= 6
          ? null
          : "Password is too short (minimum 6 characters)",
      acceptTerms: (value) => (value ? null : "You must accept terms"),
    },
  })

  function submitForm(values: {
    email: string
    password: string
    name: string
  }) {
    setIsLoading(true)
    setEmail("")
    signup(values.email, values.password, values.name).then((response) => {
      if (response.error) {
        errorNotification("Signup failed")
        return
      }
      setIsLoading(false)
      setEmail(values.email)
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
      {email ? (
        <Stack align="center">
          <Image
            src="/illustrations/mailSent.svg"
            alt="Mail Sent"
            width="0"
            height="0"
            style={{ width: "30%", height: "auto" }}
          />
          <Title ta="center">Email confirmation</Title>
          <Text ta="center">
            We have sent a confirmation email to{" "}
            <a href={`mailto:${email}`} style={{ color: "inherit" }}>
              {email}
            </a>{" "}
            to confirm the validity of the email address. After receiving the
            email, follow the link to complete the registration.
          </Text>
          <Link href="/auth/login">
            <Button>Go to login</Button>
          </Link>
        </Stack>
      ) : (
        <Stack>
          <Center>
            <Image
              src="/illustrations/signup.svg"
              alt="Mail Sent"
              width="0"
              height="0"
              style={{ width: "50%", height: "auto" }}
            />
          </Center>
          <Title ta="center">Sign Up</Title>
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
                autoComplete="text"
                leftSection={<IconUser size={20} />}
                description="This is what we will use to address you"
                label="Name"
                placeholder="Name"
                name="name"
                key={form.key("name")}
                {...form.getInputProps("name")}
                disabled={isLoading}
              />
              <TextInput
                autoComplete="email"
                leftSection={<IconMail size={20} />}
                label="Your email"
                placeholder="Your email"
                name="email"
                key={form.key("email")}
                {...form.getInputProps("email")}
                disabled={isLoading}
                required
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
                required
              />
              <Checkbox
                radius="sx"
                label="I accept the Terms of Service"
                name="acceptTerms"
                key={form.key("acceptTerms")}
                {...form.getInputProps("acceptTerms")}
                disabled={isLoading}
              />
              <Button type="submit">Sign Up</Button>
            </Stack>
          </form>
        </Stack>
      )}
    </AuthCard>
  )
}
