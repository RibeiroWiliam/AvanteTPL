"use client"

import { useState } from 'react';
import Logo from '../Shared/Logo';

export default function SidebarHeader({toggleSidebar}){

  return(
<div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <Logo/>
          <i
            className="bi bi-x cursor-pointer ml-28 lg:hidden"
            onClick={toggleSidebar}
          ></i>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
  )
}
