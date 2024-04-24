export default function SidebarRoot({ children, isOpen }) {
  return (
    <>
      {isOpen && (
        <nav className="absolute lg:static lg:col-span-4 xl:col-span-3 lg:row-span-2 z-40 h-full p-2 w-full overflow-y-auto text-center bg-gray-900">
          {children}
        </nav>
      )}
    </>
  );
}
