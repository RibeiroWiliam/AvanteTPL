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
      <body className={roboto.className}>
        <Sidebar.Root>
          <Sidebar.Header />
          <Sidebar.Search />
          <Sidebar.Item icon="bi-house-door-fill" text="Home" />
          <Sidebar.Item icon="bi bi-person-fill" text="Meu Perfil" />
          <Sidebar.Item icon="bi-bookmark-fill" text="Designaçōes" />
          <Sidebar.Item icon="bi bi-file-earmark-text-fill" text="Programação" />
          <div class="my-4 bg-gray-600 h-[1px]"></div>
          <Sidebar.Footer />
        </Sidebar.Root>
        {children}
      </body>
    </html>
  );
}
