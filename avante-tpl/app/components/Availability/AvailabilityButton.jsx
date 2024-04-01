export default function AvailabilityButton({children, onClick, color}) {
  return (
    <button onClick={onClick} className={`${color} cursor p-4 text-center inline-block rounded-lg text-white`}>
      {children}
    </button>
  )
}
