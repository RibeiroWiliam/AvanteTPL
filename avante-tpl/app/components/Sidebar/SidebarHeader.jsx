"use client";

import Logo from "../Shared/Logo";
import Image from "next/image";

export default function SidebarHeader({ toggleSidebar }) {
  return (
    <>
      <div className="px-4 pb-4 flex items-center">
        <span className="text-3xl text-gray-800 font-bold">AvanteTpl</span>
        <button
          className="lg:hidden cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </>
  );
}
