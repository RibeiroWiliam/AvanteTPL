export default function ActionButton({action, icon}) {
  return (
    <button onClick={action} className="text-gray-500 hover:text-primary transition duration-300 text-2xl lg:text-3xl">
      <i className={icon}></i>
    </button>
  )
}
