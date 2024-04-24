export default function ActionButton({action, icon}) {
  return (
    <button onClick={action} className="text-gray-600 hover:text-blue-600 transition text-2xl lg:text-3xl">
      <i className={icon}></i>
    </button>
  )
}
