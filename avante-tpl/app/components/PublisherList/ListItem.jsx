import axios from "axios";

export default function ListItem({ id, name, isAdmin }) {
  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/api/publishers/${id}`);
      console.log(response.data); // Feedback para o usuário
      router.push("/publishers")
    } catch (error) {
      console.error('Erro ao deletar publicador:', error);
    }
  }

  return (
    <tr  className="">
      <td className="py-3">{id}</td>
      <td className="py-3 text-blue-600 hover:text-blue-500"><a href={`/publishers/${id}`}>{name}</a></td>
      <td className="py-3">{isAdmin ? "Administrador" : "Publicador"}</td>
      <td className="flex justify-end gap-2 w-full p-3">
        <button><i className="bi bi-pencil-square p-2 rounded-md text-white bg-green-500 hover:bg-green-600"></i></button>
        <button onClick={deleteUser}><i className="bi bi-trash p-2 rounded-md text-white bg-red-500 hover:bg-red-600"></i></button>
      </td>
    </tr>
  );
}
