import type { authClient } from "lib/auth/auth-client";

export type Session = typeof authClient.$Infer.Session;
