import { Roboto } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Provider from "./context/Provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "AvanteTPL",
  description: "O gerenciador do testemunho publico que voce precisa!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Provider>
      <body className={`${roboto.className} p-8`} >        
        {children}      
      </body>
      </Provider>
    </html>
  );
}
