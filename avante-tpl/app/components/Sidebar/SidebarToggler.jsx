export default function SidebarToggler({toggleSidebar}) {
  return (
    <button
      className="text-gray-900 hover:text-blue-700 transition text-4xl cursor-pointer"
      onClick={toggleSidebar}
    >
      <i className="bi bi-list rounded-md"></i>
    </button>
  )
}
