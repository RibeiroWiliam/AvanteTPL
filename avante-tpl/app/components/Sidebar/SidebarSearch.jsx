export default function SidebarSearch() {
  return (
    <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
      <i className="bi bi-search text-sm"></i>
      <input
        type="text"
        placeholder="Search"
        className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
      />
    </div>
  );
}