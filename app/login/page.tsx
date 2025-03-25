"use client";

import { LoginModal } from "components/auth/auth-dialog";

const Page = () => {
  return <LoginModal open onClose={() => console.log("test")} onLogin={async () => {}} />;
};

export default Page;
