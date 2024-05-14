"use client";

import { PublisherList } from "@/app/components/PublisherList";
import axios from "axios";
import { useEffect, useState } from "react";
import Title from "@/app/components/Shared/Title";
import SearchBar from "@/app/components/Shared/SearchBar";
import Loading from "@/app/components/Shared/Loading";
import { Modal } from "@/app/components/Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session } = useSession();
  const router = useRouter();
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [deleteMenu, setDeleteMenu] = useState({
    open: false,
  });

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
              className="bg-primary text-white p-2 px-4 rounded-xl hover:bg-hover hover:text-gray-200 transition duration-300 flex gap-4"
            >
              <i className="bi bi-person-fill-add"></i>
              <span>Novo Publicador</span>
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
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-primary"
            } px-4 py-2`}
          >
            {filter}
          </button>
        ))}

      <PublisherList.Root>
        <PublisherList.Header />
        <tbody>
          {publishers &&
            applyFilters(publishers, activeFilter, search).map((publisher, index) => (
              <PublisherList.Item
                key={publisher.id}
                publisher={publisher}
                deleteMenu={(publisher) =>
                  setDeleteMenu({ open: true, publisher: publisher })
                }
                color={index % 2 === 0 ? "bg-white/50" : "bg-green-100/50"}
              />
            ))}
        </tbody>
      </PublisherList.Root>
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
