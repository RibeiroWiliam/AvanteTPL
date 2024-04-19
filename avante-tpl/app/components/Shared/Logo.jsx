import { Signika } from "next/font/google";

const signika = Signika({
  weight: "700",
  subsets: ["latin"],
});

export default function Logo({theme}) {
  const textColor = theme === "light" ? "text-blue-800" : "text-white"

  return (
    <div className={`${signika.className} text-[25px] flex px-2 font-bold uppercase gap-1`}>
      <span className={`[text-shadow:_0_2px_0_rgb(0_0_0_/_40%)] ${textColor}`}>Avante</span>
      <span className="[text-shadow:_0_2px_0_rgb(0_0_0_/_40%)] text-blue-600">Tpl</span>
    </div>
  )
}
