export default function SidebarFooter({logoutUser}) {
  return (
    <button onClick={() => logoutUser()} className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-600 text-white">
      <i className="bi bi-box-arrow-in-right"></i>
      <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
    </button>
  );
}
