"use client";

import { PublisherList } from "@/app/components/PublisherList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Title from "@/app/components/Shared/Title";
import SearchBar from "@/app/components/Shared/SearchBar";
import Loading from "@/app/components/Shared/Loading";
import { Modal } from "@/app/components/Modal";

const applyFilters = (publishers, filter, search) => {
  const filteredPublishers = search
    ? publishers.filter((publisher) =>
        publisher.name.toLowerCase().includes(search.toLowerCase())
      )
    : publishers;
  switch (filter) {
    case "Pioneiros":
      return filteredPublishers.filter((publisher) => publisher.pioneer);
    case "Administradores":
      return filteredPublishers.filter((publisher) => publisher.isAdmin);
    default:
      return filteredPublishers;
  }
};

export default function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [editMenu, setEditMenu] = useState({
    open: false,
  });
  const [deleteMenu, setDeleteMenu] = useState({
    open: false,
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.user.isAdmin) {
      router.push("/dashboard");
    }
  }, [router, session]);

  useEffect(() => {
    async function fetchPublishers() {
      try {
        setLoading(true);
        const response = await axios.get("/api/publishers");
        setPublishers(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar dados dos publicadores:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPublishers();
  }, []);

  const deleteUser = async (id) => {
    setLoading(true)
    try {
      const response = await axios.delete(`/api/publishers/${id}`);
      const updatedPublishers = publishers.filter(
        (publisher) => publisher.id !== id
      );
      setPublishers(updatedPublishers);
    } catch (error) {
      console.error("Erro ao deletar publicador:", error);
    } finally {
      setLoading(false)
    }
  };

  const editUser = async (publisher) => {};

  const filters = ["Todos", "Pioneiros", "Administradores"];

  return (
    <>
      <div className="flex flex-wrap justify-center sm:justify-between mb-4 gap-4 items-center">
        {/* Title */}
        <Title>Publicadores</Title>
        {/* Date Picker and Actions */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-4">
            <a
              href="/publishers/new"
              className="text-gray-600 hover:text-blue-600 transition text-2xl lg:text-3xl"
            >
              <i className="bi bi-person-fill-add"></i>
            </a>
          </div>
        </div>
      </div>

      <SearchBar setSearch={setSearch} />

      {/* Filter Buttons */}
      {filters &&
        filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`${
              activeFilter === filter
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-400 hover:text-blue-700"
            } font-bold px-4 py-2`}
          >
            {filter}
          </button>
        ))}

      <PublisherList.Root>
        <PublisherList.Header />
        <tbody>
          {publishers &&
            applyFilters(publishers, activeFilter, search).map((publisher) => (
              <PublisherList.Item
                key={publisher.id}
                publisher={publisher}
                editMenu={(publisher) =>
                  setEditMenu({ open: true, publisher: publisher })
                }
                deleteMenu={(publisher) =>
                  setDeleteMenu({ open: true, publisher: publisher })
                }
              />
            ))}
        </tbody>
      </PublisherList.Root>
      {editMenu.open && (
        <Modal.Root width="w-96">
          <Modal.Toggler closeMenu={() => setEditMenu({})} />
          <Modal.Title>{editMenu.publisher.name}</Modal.Title>
          <form onSubmit={editUser(editMenu.publisher)} className="flex flex-col gap-4">
            <div className="flex gap-2">
            <label htmlFor="name">Nome</label>
            <input defaultValue={editMenu.publisher.name} onChange={e => editMenu.publisher.name = e.target.value} type="text"/>
            </div>
            <div>
            <label htmlFor="pioneer">Permissão</label>
            <input value={editMenu.publisher.pioneer} type="text"/>
            </div>
            
            <label htmlFor="pioneer">Privilégio</label>
            <div className="w-full flex gap-4 justify-center">
            <Modal.Button onClick={() => setEditMenu({})} variant="outline">
              Cancelar
            </Modal.Button>
            <Modal.Button onClick={() => editUser(editMenu.publisher)}>
              Salvar
            </Modal.Button>
          </div>
          </form>
        </Modal.Root>
      )}
      {deleteMenu.open && (
        <Modal.Root width="w-96">
          <Modal.Toggler closeMenu={() => setDeleteMenu({})} />
          <Modal.Title>Deseja excluir {deleteMenu.publisher.name}?</Modal.Title>
          <div className="flex flex-col gap-2 mb-4">
          <p>Id: {deleteMenu.publisher.id}</p>
          <p>Permissão: {deleteMenu.publisher.isAdm ? "Administrador" : "Padrão"}</p>
          <p>Privilégio: {deleteMenu.publisher.pioneer ? `Pioneiro ${deleteMenu.publisher.pioneer}` : "Publicador"}</p>
          </div>
          
          <div className="w-full flex gap-4 justify-center">
            <Modal.Button onClick={() => setDeleteMenu({})} variant="outline">
              Cancelar
            </Modal.Button>
            <Modal.Button onClick={() => deleteUser(deleteMenu.publisher.id)}>
              Excluir
            </Modal.Button>
          </div>
        </Modal.Root>
      )}
      {loading && <Loading />}
    </>
  );
}
