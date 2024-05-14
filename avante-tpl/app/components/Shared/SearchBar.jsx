export default function SearchBar({color = "bg-white", setSearch}) {
  return (
    <div className={`${color} flex p-2 px-4 gap-4 w-full rounded-full my-4 shadow`}>
        <i className="bi bi-search text-gray-400"></i>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className={`${color} outline-none w-full`}
          type="text"
          placeholder="Nome do publicador..."
        />
    </div>
  );
}
