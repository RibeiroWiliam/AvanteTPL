export default function ModalButton({onClick, variant = "base", children}) {
  const getStyles = () => {
    switch (variant) {
      case 'base':
        return "text-white bg-blue-600 hover:bg-blue-700 hover:text-gray-100"
      case 'outline':
        return "border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-gray-100"
      default:
        console.log(`Sorry, we are out of ${variant}.`);
    }
  }
  return (
    <button onClick={onClick} className={`${getStyles()} py-2 px-6 min-w-40 rounded-lg transition`}>
      {children}
    </button>
  )
}
