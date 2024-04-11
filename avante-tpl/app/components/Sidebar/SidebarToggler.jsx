export default function SidebarToggler({toggleSidebar}) {
  return (
    <button
      className="lg:hidden fixed text-gray-900 text-4xl top-2 right-4 cursor-pointer"
      onClick={toggleSidebar}
    >
      <i className="bi bi-list px-2 rounded-md"></i>
    </button>
  )
}
