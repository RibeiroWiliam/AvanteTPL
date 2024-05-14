export default function SidebarFooter({logoutUser}) {
  return (
    <button onClick={() => logoutUser()} className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer text-gray-500 hover:text-primary">
      <i className="bi bi-box-arrow-in-right"></i>
      <span className="text-[15px] ml-4">Sair</span>
    </button>
  );
}
