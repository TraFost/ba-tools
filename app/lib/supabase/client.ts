import { createBrowserClient } from "@supabase/ssr";
import { env } from "config/env";

export const createClient = () => createBrowserClient(env.supabase.projectUrl, env.supabase.apiKey);
