"use server";

import { env } from "config/env";
import { createClient } from "lib/supabase/server";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: env.supabase.callbackUrl,
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
};
