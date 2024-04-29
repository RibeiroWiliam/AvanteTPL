export default function AvailabilityCard({children, color, onClick}) {
  return (
    <div className={`${color} p-4 text-center inline-block rounded-lg text-white relative`}>
      {children}
      <button onClick={onClick} className="absolute top-1 right-2  text-sm hover:text-gray-900"><i className="bi bi-trash-fill"></i></button>   
    </div>
  )
}
