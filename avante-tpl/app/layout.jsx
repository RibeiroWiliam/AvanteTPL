import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "AvanteTPL",
  description: "O gerenciador do testemunho publico que voce precisa!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} p-8`} >        
        {children}      
      </body>
    </html>
  );
}
