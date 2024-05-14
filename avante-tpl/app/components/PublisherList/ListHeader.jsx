export default function ListHeader() {
  return (
    <thead>
      <tr className="text-left border-b border-gray-200 bg-green-100/50">
        <th className="px-4 py-4">Nome</th>
        <th className="py-4 hidden md:table-cell">Privilégios</th>
        <th className="px-4 py-4"></th>
      </tr>
    </thead>
  );
}
