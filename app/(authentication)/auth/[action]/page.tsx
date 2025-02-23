import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { PasswordRecoveryForm } from "@/components/auth/PasswordRecoveryForm";
import { PasswordUpdateForm } from "@/components/auth/ChangePasswordForm";

export default async function Page({
  params,
}: {
  params: Promise<{ action: string }>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const action = (await params).action;

  if (action === "recover") {
    return <PasswordRecoveryForm />;
  }
  if (action === "update-password") {
    return <PasswordUpdateForm />;
  }

  if (data.user) {
    redirect("/");
  }

  if (action === "login") {
    return <LoginForm />;
  } else if (action === "signup") {
    return <SignupForm />;
  }
  return notFound();
}
