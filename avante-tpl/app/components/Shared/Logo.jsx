import { Signika } from "next/font/google";

const signika = Signika({
  weight: "700",
  subsets: ["latin"],
});

export default function Logo({theme, size, responsible=false}) {
  const textColor = theme === "light" ? "text-blue-800" : "text-white"
  const textSize = size ? size : "text-[25px]"

  return (
    <div className={`${signika.className} ${textSize} flex px-2 font-bold uppercase gap-1 text-xl`}>
      <span className={`${textColor} ${responsible ? "sm:text-base md:text-lg" : ""}`}>Avante</span>
      <span className={`text-blue-600 ${responsible ? "sm:text-base md:text-lg" : ""}`}>Tpl</span>
    </div>
  )
}
