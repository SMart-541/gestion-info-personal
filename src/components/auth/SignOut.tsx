"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

export default function SignOut() {
  const { data: session, status } = useSession();
  const strings = useTranslations("SignOutPage")

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <Button variant="destructive" className="h-6" onClick={() => signOut({ callbackUrl: "/" })}>
        {strings("title")}
      </Button>
    );
  }
  return (
    <div className="space-y-3">
      <p>Not signed in </p>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}