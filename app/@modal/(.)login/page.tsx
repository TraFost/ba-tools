"use client";

import { useRouter } from "next/navigation";

import { LoginModal } from "components/auth/auth-dialog";
import { signInWithGoogle } from "lib/auth/actions";

const LoginModalPage = () => {
  const { back } = useRouter();

  return <LoginModal open onClose={back} onLogin={signInWithGoogle} />;
};

export default LoginModalPage;
