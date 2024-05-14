export default function SidebarToggler({toggleSidebar}) {
  return (
    <button
      className="flex justify-center items-center gap-4 text-secondary hover:text-primary cursor-pointer"
      onClick={toggleSidebar}
    >
      <i className="bi bi-list text-2xl"></i>
      <span>Esconder Menu</span>
    </button>
  )
}
