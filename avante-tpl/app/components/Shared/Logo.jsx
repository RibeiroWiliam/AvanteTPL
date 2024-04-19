import { Signika } from "next/font/google";

const signika = Signika({
  weight: "700",
  subsets: ["latin"],
});

export default function Logo({theme, size}) {
  const textColor = theme === "light" ? "text-blue-800" : "text-white"

  const textSize = size ? size : "text-[25px]"

  return (
    <div className={`${signika.className} ${textSize} flex px-2 font-bold uppercase gap-1`}>
      <span className={`[text-shadow:_0_2px_0_rgb(0_0_0_/_40%)] ${textColor}`}>Avante</span>
      <span className="[text-shadow:_0_2px_0_rgb(0_0_0_/_40%)] text-blue-600">Tpl</span>
    </div>
  )
}
