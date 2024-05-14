export default function SidebarRoot({ children, isOpen }) {
  return (
    <>
      {isOpen && (
        <nav className="absolute lg:static row-span-2 z-40 h-full w-full p-4 pb-8 border overflow-y-auto flex flex-col justify-between text-center">
          {children}
        </nav>
      )}
    </>
  );
}
