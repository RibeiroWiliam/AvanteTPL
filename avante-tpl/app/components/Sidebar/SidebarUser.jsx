export default function SidebarUser({user, isAdmin, href}) {
  return (
    <a href={href}>
      <div className={`p-2.5 mt-3 rounded-md px-4 duration-300 cursor-pointer text-white flex gap-4`}>
        <img src="/userIcon.png" alt="User Icon" className="w-[45px]" />
        <div className="flex flex-col text-start">
        <span className="text-[16px] text-gray-200 font-bold">{user}</span>
        <span className="text-[14px] text-gray-400 font-bold">{isAdmin ? "Admin" : "Publicador"}</span>
        </div>
        
      </div>   
    </a>
  )
}
