"use server"

import { createClient } from "./server"
import { AuthError } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

type AuthResponse =
  | {
      error: null
      data: string
      redirect?: string
    }
  | { error: AuthError; data: null }

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password: string) {
  return password.length >= 6
}

export async function loginGoogle(): Promise<AuthResponse> {
  const supabase = await createClient()
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/code-auth`,
    },
  })
  if (error) {
    return Promise.resolve({
      error,
      data: null,
    })
  }

  return Promise.resolve({
    error: null,
    data: "success",
    redirect: data.url,
  })
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const supabase = await createClient()

  if (!validateEmail(email)) {
    return Promise.resolve({
      error: new AuthError("Invalid email address"),
      data: null,
    })
  }

  if (!validatePassword(password)) {
    return Promise.resolve({
      error: new AuthError("Password too short"),
      data: null,
    })
  }

  const data = {
    email,
    password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error, data: null }
  }

  return { error: null, data: "success" }
}

export async function signup(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  const supabase = await createClient()

  if (!validateEmail(email)) {
    return Promise.resolve({
      error: new AuthError("Invalid email address"),
      data: null,
    })
  }

  if (!validatePassword(password)) {
    return Promise.resolve({
      error: new AuthError("Password too short"),
      data: null,
    })
  }

  const data = {
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${process.env.SITE_URL}/dashboard`,
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error, data: null }
  }

  return { error: null, data: "success" }
}

export async function recover(email: string): Promise<AuthResponse> {
  const supabase = await createClient()

  if (!validateEmail(email)) {
    return Promise.resolve({
      error: new AuthError("Invalid email address"),
      data: null,
    })
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.SITE_URL}/auth/update-password`,
  })
  if (error) {
    return Promise.resolve({
      error: new AuthError("Error sending recovery email"),
      data: null,
    })
  }
  return Promise.resolve({
    error: null,
    data: "success",
  })
}

export async function updatePassword(password: string): Promise<AuthResponse> {
  const supabase = await createClient()

  if (!validatePassword(password)) {
    return Promise.resolve({
      error: new AuthError("Password too short"),
      data: null,
    })
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })
  if (error) {
    return Promise.resolve({
      error: new AuthError("Error updating password"),
      data: null,
    })
  }
  return Promise.resolve({
    error: null,
    data: "success",
  })
}

export async function codeLogin(code: string): Promise<AuthResponse> {
  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return Promise.resolve({
      error: new AuthError("Error logging in"),
      data: null,
    })
  }
  return Promise.resolve({
    error: null,
    data: "success",
  })
}
