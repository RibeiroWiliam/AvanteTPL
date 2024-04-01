export default function SidebarToggler({toggleSidebar}) {
  return (
    <span
      className="absolute text-gray-900 text-4xl top-5 left-4 cursor-pointer"
      onClick={toggleSidebar}
    >
      <i className="bi bi-list px-2 rounded-md"></i>
    </span>
  )
}
