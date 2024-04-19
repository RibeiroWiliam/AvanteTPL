"use client"

import Logo from "@/app/components/Shared/Logo";
import { useSession } from "next-auth/react";


export default function Dashboard() {
  const {data: session} = useSession()

  return (
    <div className="w-full flex justify-center items-center text-xl">
      Olá <span className="ml-2 text-blue-600">{session && session.user.name}</span>!
      Seja bem vindo ao <Logo theme="light"/>
    </div>
  );
}
