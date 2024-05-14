"use client";

import Title from "@/app/components/Shared/Title";
import usePublisher from "@/app/hooks/usePublisher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status && status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  const { publisher } = usePublisher(session?.user.id)

  return (
    <>
      <div className="mb-4">
        <Title>Dashboard</Title>
      </div>
      <section className="grid grid-cols-4 gap-8">
        <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col">
          <div className="flex justify-between text-gray-500 mb-2">
          <span className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-white text-xl shadow-lg"><i className="bi bi-calendar-week"></i></span>
          <button><i className="bi bi-three-dots-vertical"></i></button>
          </div>
         
          <span className="text-gray-500">N° Disponibilidades</span>
          <span className="text-hover font-bold text-2xl">{publisher?.availabilities.length}</span>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col">
          <div className="flex justify-between text-gray-500 mb-2">
          <span className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-white text-xl shadow-lg"><i className="bi bi-bookmarks-fill"></i></span>
          <button><i className="bi bi-three-dots-vertical"></i></button>
          </div>
         
          <span className="text-gray-500">N° Designações</span>
          <span className="text-hover font-bold text-2xl">{publisher?.assignments.length}</span>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col">
          <div className="flex justify-between text-gray-500 mb-2">
          <span className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-white text-xl shadow-lg"><i className="bi bi-bookmarks-fill"></i></span>
          <button><i className="bi bi-three-dots-vertical"></i></button>
          </div>
         
          <span className="text-gray-500">N° Designações</span>
          <span className="text-hover font-bold text-2xl">{publisher?.assignments.length}</span>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col">
          <div className="flex justify-between text-gray-500 mb-2">
          <span className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-white text-xl shadow-lg"><i className="bi bi-bookmarks-fill"></i></span>
          <button><i className="bi bi-three-dots-vertical"></i></button>
          </div>
         
          <span className="text-gray-500">N° Designações</span>
          <span className="text-hover font-bold text-2xl">{publisher?.assignments.length}</span>
        </div>
      </section>
    </>
  );
}
