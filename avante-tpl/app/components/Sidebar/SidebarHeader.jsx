"use client"

import { useState } from 'react';

export default function SidebarHeader(){
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function openSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return(
<div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">AvanteTPL</h1>
          <i
            className="bi bi-x cursor-pointer ml-28 lg:hidden"
            onClick={openSidebar}
          ></i>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
  )
}
