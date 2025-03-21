import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  fetchOptions: {
    onError: (errCtx) => {
      console.error(errCtx);
      toast.error(errCtx.error.message);
    },
  },
});

export const { useSession, signOut } = authClient;
