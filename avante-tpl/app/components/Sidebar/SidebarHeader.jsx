"use client"

import { useState } from 'react';

export default function SidebarHeader(){
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function openSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return(
<div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">
          <i class="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 class="font-bold text-gray-200 text-[15px] ml-3">AvanteTPL</h1>
          <i
            class="bi bi-x cursor-pointer ml-28 lg:hidden"
            onclick={openSidebar}
          ></i>
        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>
  )
}
