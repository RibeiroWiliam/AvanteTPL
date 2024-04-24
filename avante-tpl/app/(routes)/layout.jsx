"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import Logo from "../components/Shared/Logo";

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
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
      <Sidebar.Root isOpen={isSidebarOpen}>
        <Sidebar.Header toggleSidebar={toggleSidebar}/>
        {session && (
          <Sidebar.User
            user={session.user.name}
            isAdmin={session.user.isAdmin}
            pioneer={session.user.pioneer}
          />
        )}
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <Sidebar.Item
          icon="bi-house-door-fill"
          text="Home"
          href="/dashboard"
          isActive={pathname === "/dashboard"}
        />
        {session && (
          <Sidebar.Item
            icon="bi-person-fill"
            text="Meu Perfil"
            href={`/publishers/${session?.user.id}` || "#"}
            isActive={pathname === `/publishers/${session?.user.id}`}
          />
        )}
        <Sidebar.Item
          icon="bi-bookmark-fill"
          text="Designações"
          href="/assignments"
          isActive={pathname === "/assignments"}
        />
        <Sidebar.Item
          icon="bi bi-file-earmark-text-fill"
          text="Programação"
          href="/schedule"
          isActive={pathname === "/schedule"}
        />
        {session?.user.isAdmin && (
          <Sidebar.Item
            icon="bi bi-people-fill"
            text="Publicadores"
            href="/publishers"
            isActive={pathname === "/publishers"}
          />
        )}
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <Sidebar.Footer logoutUser={logoutUser} />
      </Sidebar.Root>
      <header className="w-full col-span-8 xl:col-span-9 p-4 flex justify-between">
        <Logo theme="light" />
        <div className="flex items-center gap-3">
        <button className="text-gray-700 hover:text-blue-700 transition text-3xl cursor-pointer">
        <i className="bi bi-gear-fill"></i>
        </button>
        <Sidebar.Toggler toggleSidebar={toggleSidebar} />
        </div>      
      </header>
      <main
        className={`p-4 col-span-8 xl:col-span-9 overflow-y-scroll`}
      >
        {children}
      </main>
    </div>
  );
}
