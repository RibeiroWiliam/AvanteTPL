export default function AvailabilityCard({children, color}) {
  return (
    <div className={`${color} p-4 text-center inline-block rounded-lg text-white`}>
      {children}
    </div>
  )
}
