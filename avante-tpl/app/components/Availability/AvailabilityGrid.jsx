export default function AvailabilityGrid({children}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
      {children}
    </div>
  )
}
