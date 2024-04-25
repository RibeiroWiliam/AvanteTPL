export default function ModalRoot({
  position = "absolute",
  x = "left-1/3",
  y = "top-20",
  color = "bg-white",
  children,
}) {
  return <div className={`${position} ${x} ${y} ${color} py-4 px-6 pt-8 rounded-lg shadow-xl`}>{children}</div>;
}
