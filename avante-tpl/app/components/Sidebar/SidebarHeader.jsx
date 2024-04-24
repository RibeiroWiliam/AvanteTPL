"use client";

import Logo from "../Shared/Logo";

export default function SidebarHeader({ toggleSidebar }) {
  return (
    <>
      <div className="p-2.5 mt-1 flex pr-4 justify-between">
        <Logo />
        <button
          className="lg:hidden cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="my-2 bg-gray-600 h-[1px]"></div>
    </>
  );
}
