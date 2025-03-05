"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Button,
  PasswordInput,
  Title,
  LoadingOverlay,
  Text,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import {
  errorNotification,
  successNotification,
} from "@/utils/notifications/notifications"
import { codeLogin, updatePassword } from "@/utils/supabase/authAction"
import { AuthCard } from "./AuthCard"

export function PasswordUpdateForm() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [codeValid, setCodeValid] = useState(true)

  useEffect(() => {
    const code = searchParams.get("code")
    if (!code) {
      setIsLoading(false)
      setCodeValid(false)
      errorNotification(
        "Invalid password reset link, the link might have expired"
      )
    } else {
      codeLogin(code).then((response) => {
        if (response.error) {
          setIsLoading(false)
          setCodeValid(false)
          errorNotification(
            "Invalid password reset link, the link might have expired"
          )
        } else {
          setIsLoading(false)
          setCodeValid(true)
        }
      })
    }
  }, [searchParams])

  const router = useRouter()
  const [pwvisible, setPwVisible] = useState(false)

  function togglePwVisibility() {
    setPwVisible((visible) => !visible)
  }

  const form = useForm({
    mode: "uncontrolled",
    onSubmitPreventDefault: "always",
    initialValues: {
      password: "",
      passwordRepeat: "",
    },

    validate: {
      password: (value) =>
        value.length >= 6
          ? null
          : "Password is too short (minimum 6 characters)",
      passwordRepeat: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  })

  function submitForm(values: { password: string }) {
    setIsLoading(true)
    updatePassword(values.password).then((reponse) => {
      if (reponse.error) {
        errorNotification(reponse.error.message)
        setIsLoading(false)
        return
      }
      successNotification("Password updated successfully")
      router.push("/")
    })
  }

  return (
    <AuthCard>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {codeValid ? (
        <>
          <Title order={1} ta="center">
            Set new password
          </Title>
          <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            <PasswordInput
              label="New password"
              placeholder="Your password"
              name="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
              visible={pwvisible}
              onVisibilityChange={togglePwVisibility}
            />
            <PasswordInput
              label="Repeat new password"
              placeholder="Your password"
              name="passwordRepeat"
              key={form.key("passwordRepeat")}
              {...form.getInputProps("passwordRepeat")}
              visible={pwvisible}
              onVisibilityChange={togglePwVisibility}
            />

            <Button fullWidth type="submit" mt="md">
              Set new password
            </Button>
          </form>
        </>
      ) : (
        <>
          <Title order={1} ta="center">
            Uh oh
          </Title>
          <Text>
            The password reset link is invalid or has expired. Please request a
            new one
          </Text>
        </>
      )}
    </AuthCard>
  )
}
