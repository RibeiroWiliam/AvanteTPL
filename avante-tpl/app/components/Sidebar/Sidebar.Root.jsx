export default function SidebarRoot({ children, isOpen }) {
  return (
    <>
      {isOpen && (
        <nav className="sidebar fixed top-0 bottom-0 left-0 z-40 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
          {children}
        </nav>
      )}
    </>
  );
}
