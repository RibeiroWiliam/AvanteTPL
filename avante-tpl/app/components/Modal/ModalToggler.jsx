export default function ModalToggler({closeMenu}) {
  return (
    <button onClick={closeMenu} className="absolute top-2 right-2 text-gray-900 hover:text-red-600">
      <i className="bi bi-x-lg"></i>
    </button>
  )
}
