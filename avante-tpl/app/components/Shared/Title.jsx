export default function Title({children, text}) {
  return (
    <h1 className={`${text ? text : ""} text-xl md:text-2xl font-bold`}>
      {children}
    </h1>
  )
}
