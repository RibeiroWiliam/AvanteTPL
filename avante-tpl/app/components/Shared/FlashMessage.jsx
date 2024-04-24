export default function FlashMessage({ message, closeMessage }) {
  return (
    <div className="absolute pt-8 p-6 top-32 bg-white left-1/2 flex flex-col gap-4">
      <h2 className="font-bold text-lg">Programação atualizada com sucesso!</h2>
      {message.createdAssignments > 0 && (
        <p>Designações criadas: {message.createdAssignments}</p>
      )}
      {message.updatedAssignments > 0 && (
        <p>Designações modificadas: {message.updatedAssignments}</p>
      )}
      {message.deletedAssignments > 0 && (
        <p>Designações excluídas: {message.deletedAssignments}</p>
      )}
      {message.errors > 0 && (
        <>
          <h3 className="font-bold text-gray-900">
            Houveram alguns erros durante a atualização:
          </h3>
          <ul>
            {message.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </>
      )}
      <button
        onClick={closeMessage}
        className="absolute top-2 right-2 font-bold text-gray-900 hover:text-blue-700"
      >
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
}
