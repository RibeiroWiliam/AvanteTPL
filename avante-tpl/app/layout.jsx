import { Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";

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
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
      />
      <body className={`${roboto.className} p-4 pl-[350px]`} >
        <Sidebar.Root>
          <Sidebar.Header />
          <Sidebar.Search />
          <Sidebar.Item icon="bi-house-door-fill" text="Home" href="/"/>
          <Sidebar.Item icon="bi bi-person-fill" text="Meu Perfil" href="profile" />
          <Sidebar.Item icon="bi-bookmark-fill" text="Designaçōes" href="/assignments" />
          <Sidebar.Item icon="bi bi-file-earmark-text-fill" text="Programação" href="/schedule" />
          <Sidebar.Item icon="bi bi-people-fill" text="Publicadores" href="/publishers" />
          <div class="my-4 bg-gray-600 h-[1px]"></div>
          <Sidebar.Footer />
        </Sidebar.Root>
        {children}      
      </body>
    </html>
  );
}
