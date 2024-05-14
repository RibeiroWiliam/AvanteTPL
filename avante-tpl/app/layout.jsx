import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Provider from "./context/Provider";

export const metadata = {
  title: "AvanteTPL",
  description: "O gerenciador do testemunho publico que voce precisa!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Provider>
      <body className={`bg-white w-screen h-screen`} >        
        {children}      
      </body>
      </Provider>
    </html>
  );
}
