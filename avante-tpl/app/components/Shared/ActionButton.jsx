export default function ActionButton({action, icon}) {
  return (
    <button onClick={action} className="text-blue-600 text-2xl lg:text-3xl">
      <i className={icon}></i>
    </button>
  )
}
