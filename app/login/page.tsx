// TODO: Add login page >> Galih Aditya Dwisevi

"use client";

import { useRouter } from "next/navigation";

import { LoginModal } from "components/auth/auth-dialog";
import { signInWithGoogle } from "lib/auth/actions";

const LoginPage = () => {
  const { push } = useRouter();

  return <LoginModal open onClose={() => push("/")} onLogin={signInWithGoogle} />;
};

export default LoginPage;
