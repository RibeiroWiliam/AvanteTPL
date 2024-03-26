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
      <body className={`${roboto.className} p-8 pr-12 pl-[350px] bg-gray-100`} >
        <Sidebar.Root>
          <Sidebar.Header />
          <Sidebar.Search />
          <Sidebar.Item icon="bi-house-door-fill" text="Home" href="/"/>
          <Sidebar.Item icon="bi bi-person-fill" text="Meu Perfil" href="/publishers/1" />
          <Sidebar.Item icon="bi-bookmark-fill" text="Designaçōes" href="/assignments" />
          <Sidebar.Item icon="bi bi-file-earmark-text-fill" text="Programação" href="/schedule" />
          <Sidebar.Item icon="bi bi-people-fill" text="Publicadores" href="/publishers" />
          <div className="my-4 bg-gray-600 h-[1px]"></div>
          <Sidebar.Footer />
        </Sidebar.Root>
        {children}      
      </body>
    </html>
  );
}
