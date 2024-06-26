export default function ListItem({ publisher, deleteMenu, color }) {
  const { id, isAdmin, name, pioneer } = publisher;
  return (
    <tr className={color + ""}>
      <td className="py-4 px-4 hover:text-blue-700">
        <a href={`/publishers/${id}`}>{name}</a>
      </td>
      <td className="py-4 hidden md:table-cell">
        {isAdmin && (
          <span className="py-2 px-4 text-orange-800 bg-orange-200 rounded-lg mr-2">
            Administrador
          </span>
        )}
        {pioneer && pioneer === "Auxiliar" && (
          <span className="py-2 px-4 text-green-800 bg-green-200 rounded-lg">
            Pioneiro {pioneer}
          </span>
        )}
        {pioneer && pioneer === "Regular" && (
          <span className="py-2 px-4 text-purple-800 bg-purple-200 rounded-lg">
            Pioneiro {pioneer}
          </span>
        )}
        {!pioneer && (
          <span className="py-2 px-4 text-blue-800 bg-blue-200 rounded-lg">
          Publicador
        </span>
        )}
      </td>
      <td className="flex justify-end gap-2 w-full p-3">
        <a href={`/publishers/${id}/edit`}>
          <i className="bi bi-pencil-square p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"></i>
        </a>
        <button onClick={() => deleteMenu(publisher)}>
          <i className="bi bi-trash p-2 rounded-md text-white bg-red-500 hover:bg-red-600"></i>
        </button>
      </td>
    </tr>
  );
}
