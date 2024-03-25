export default function SidebarRoot({children}){
  return(
    <nav className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
      {children}
    </nav>
  )
}