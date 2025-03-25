"use client";

import { LoginModal } from "components/auth/auth-dialog";
import { signInWithGoogle } from "lib/auth/actions";

const Page = () => {
  return <LoginModal open onClose={() => console.log("test")} onLogin={signInWithGoogle} />;
};

export default Page;
