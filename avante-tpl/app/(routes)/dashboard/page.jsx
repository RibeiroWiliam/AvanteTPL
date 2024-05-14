"use client";

import Logo from "@/app/components/Shared/Logo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (status && status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-1 justify-center items-center md:text-lg">
      <div className="flex gap-1">
        Olá
        <span className="font-bold">{session && session.user.name}!</span>
      </div>
      <div className="flex items-center">
        Seja bem vindo ao
        <Logo theme="light" responsible />
      </div>
    </div>
  );
}
