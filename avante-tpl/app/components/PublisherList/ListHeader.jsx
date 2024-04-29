export default function ListHeader() {
  return (
    <thead>
      <tr className="text-left border-b border-gray-200">
        <th className="py-2">Nome</th>
        <th className="py-2 hidden md:table-cell">Privilégios</th>
        <th className="py-2"></th>
      </tr>
    </thead>
  );
}
