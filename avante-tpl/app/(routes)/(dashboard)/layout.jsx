import { Sidebar } from "../../components/Sidebar";

export default function DashboardLayout({children}){
  return(
    <>
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
        <main className="pr-4 pl-[325px]">
        {children}
        </main>       
    </>          
  )  
}

