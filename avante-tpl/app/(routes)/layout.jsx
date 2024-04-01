"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userFromDB, setUserFromDB] = useState(null);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchUserByName() {
      try {
        const { data } = await axios.get(
          `/api/publishers/${session.user.name}`
        );
        setUserFromDB(data); // assuming data contains user details fetched from the API
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    if (session?.user?.name) {
      fetchUserByName();
    }
  }, [session]);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const sidebarItems = [
    { icon: "bi-house-door-fill", text: "Home", href: "/dashboard" },
    { icon: "bi bi-person-fill", text: "Meu Perfil", href: "/publishers/1" },
    { icon: "bi-bookmark-fill", text: "Designaçōes", href: "/assignments" },
    {
      icon: "bi bi-file-earmark-text-fill",
      text: "Programação",
      href: "/schedule",
    },
    { icon: "bi bi-people-fill", text: "Publicadores", href: "/publishers" },
  ];

  return (
    <>
      <Sidebar.Toggler toggleSidebar={toggleSidebar} />
      <Sidebar.Root isOpen={isSidebarOpen}>
        <Sidebar.Header toggleSidebar={toggleSidebar} />
        {session && session.user && (
          <Sidebar.User
            user={session.user.name}
            isAdmin={userFromDB?.isAdmin || false}
          />
        )}
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        {sidebarItems.map((item) => (
          <Sidebar.Item
            key={item.href}
            icon={item.icon}
            text={item.text}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <Sidebar.Footer />
      </Sidebar.Root>
      <main className={`pr-4 ${isSidebarOpen ? "pl-[325px]" : "pl-0"}`}>
        {children}
      </main>
    </>
  );
}
