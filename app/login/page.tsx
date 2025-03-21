"use client";

import { LoginModal } from "components/auth/auth-dialog";
import { authClient } from "lib/auth/auth-client";

const Page = () => {
  return (
    <LoginModal
      open
      onClose={() => console.log("test")}
      onLogin={async () => {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      }}
    />
  );
};

export default Page;
