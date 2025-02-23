import { Dashboard } from "@/components/dashboard/dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    redirect("/auth/login");
  }
  return <Dashboard user={user} signOutFunction={signOut} />;
}
