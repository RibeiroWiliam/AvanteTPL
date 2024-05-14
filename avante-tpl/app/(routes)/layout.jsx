"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import Logo from "../components/Shared/Logo";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const router = useRouter();
  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      router.push("/login");
    }
  }, [router, status]);

  useEffect(() => {
    setIsSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function logoutUser() {
    console.log("ok");
    signOut({ callbackUrl: "/login" });
  }

  return (
    <div className="w-full h-full grid grid-cols-layout grid-rows-layout">
      <Sidebar.Root isOpen={isSidebarOpen}>
        <div>
          <Sidebar.Header toggleSidebar={toggleSidebar} />
          {session && (
            <Sidebar.User
              user={session.user.name}
              isAdmin={session.user.isAdmin}
              pioneer={session.user.pioneer}
            />
          )}
          <Sidebar.Item
            icon="bi-house-door"
            text="Home"
            href="/dashboard"
            isActive={pathname === "/dashboard"}
          />
          {session && (
            <Sidebar.Item
              icon="bi-person"
              text="Meu Perfil"
              href={`/publishers/${session?.user.id}` || "#"}
              isActive={pathname === `/publishers/${session?.user.id}`}
            />
          )}
          <Sidebar.Item
            icon="bi-bookmarks"
            text="Designações"
            href="/assignments"
            isActive={pathname === "/assignments"}
          />
          <Sidebar.Item
            icon="bi bi-file-earmark-text"
            text="Programação"
            href="/schedule"
            isActive={pathname === "/schedule"}
          />
          {session?.user.isAdmin && (
            <Sidebar.Item
              icon="bi bi-people"
              text="Publicadores"
              href="/publishers"
              isActive={pathname === "/publishers"}
            />
          )}
        </div>
        <Sidebar.Footer logoutUser={logoutUser} />
      </Sidebar.Root>
      <header className={`w-full p-4 flex justify-between items-center`}>
        <div className={`flex ${isSidebarOpen ? "hidden" : ""}`}>
          <Image width={25} height={25} src="/favicon.ico" />
          <Logo theme="light" />
        </div>
        <div className="flex items-center gap-3">
          <Sidebar.Toggler toggleSidebar={toggleSidebar} />
        </div>
      </header>
      <main className={`p-8 overflow-y-scroll relative bg-gray-100`}>
        {children}
      </main>
    </div>
  );
}
