"use client"

import {
  Center,
  Loader,
  Title,
  Group,
  Stack,
  Button,
  Text,
} from "@mantine/core"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { errorNotification } from "@/utils/notifications/notifications"
import { codeLogin } from "@/utils/supabase/authAction"
import Image from "next/image"
import Link from "next/link"

export function CodeAuth() {
  const searchParams = useSearchParams()
  const [codeValid, setCodeValid] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    const code = searchParams.get("code")
    if (!code) {
      setCodeValid(false)
      errorNotification(
        "Invalid password reset link, the link might have expired"
      )
    } else {
      codeLogin(code).then((response) => {
        if (isMounted) {
          if (response.error) {
            setCodeValid(false)
            errorNotification("Invalid code, the link might have expired")
          } else {
            setCodeValid(true)
            router.push("/dashboard")
          }
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [searchParams, router])

  return (
    <Center h="100vh">
      <Stack justify="center" align="center" gap="xl">
        <Group>
          <Image src="/favicon.svg" alt="Taskium" width="60" height="60" />
          <Title order={3}>Taskium</Title>
        </Group>
        {codeValid ? (
          <>
            <Loader />
            <Title order={4}>Redirecting...</Title>
          </>
        ) : (
          <>
            <Title order={4}>Invalid code, the link might have expired</Title>
            <Text>Try to log in again</Text>
            <Link href="/">
              <Button>Return home</Button>
            </Link>
          </>
        )}
      </Stack>
    </Center>
  )
}
