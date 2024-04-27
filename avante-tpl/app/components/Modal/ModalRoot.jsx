export default function ModalRoot({
  width="w-1/2",
  position = "absolute",
  x = "left-0 right-0",
  y = "top-20",
  color = "bg-white",
  children,
}) {
  return <div className={`${width} ${position} ${x} ${y} ${color} py-4 px-6 pt-8 rounded-lg shadow-xl m-auto`}>{children}</div>;
}
