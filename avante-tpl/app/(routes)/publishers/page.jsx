"use client";

import { PublisherList } from "@/app/components/PublisherList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Title from "@/app/components/Shared/Title";
import SearchBar from "@/app/components/Shared/SearchBar";

const applyFilters = (publishers, filter, search) => {
  const filteredPublishers = search ? publishers.filter(publisher => publisher.name.toLowerCase().includes(search.toLowerCase())) : publishers
  switch (filter) {
    case "Pioneiros":
      return filteredPublishers.filter(
        (publisher) =>
          publisher.pioneer
      );
    case "Administradores":
        return filteredPublishers.filter(
          (publisher) =>
            publisher.isAdmin
      );
    default:
      return filteredPublishers;
  }
};

export default function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("")
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session && !session.user.isAdmin){
      router.push("/dashboard")
    }   
  }, [router, session])

  useEffect(() => {
    async function fetchPublishers() {
      try {
        const response = await axios.get("/api/publishers");
        setPublishers(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar dados dos publicadores:", error);
      }
    }
    fetchPublishers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/publishers/${id}`);
      const updatedPublishers = publishers.filter(publisher => publisher.id !== id)
      setPublishers(updatedPublishers)
    } catch (error) {
      console.error('Erro ao deletar publicador:', error);
    }
  }

  const filters = ["Todos", "Pioneiros", "Administradores"]

  return (
    <>
      <div className="flex flex-wrap justify-center sm:justify-between mb-4 gap-4 items-center">
        {/* Title */}
        <Title>Publicadores</Title>
        {/* Date Picker and Actions */}
        <div className="flex gap-4 items-center">
        <div className="flex gap-4">
          <a href="/publishers/new" className="text-gray-600 hover:text-blue-600 transition text-2xl lg:text-3xl">
            <i className="bi bi-person-fill-add"></i>
          </a>
        </div>
        </div>
      </div>
      
      <SearchBar setSearch={setSearch}/>

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
        <PublisherList.Header/>
        <tbody>
        {publishers && applyFilters(publishers, activeFilter, search).map((publisher) => (
          <PublisherList.Item
            key={publisher.id}
            publisher={publisher}
            deleteUser={deleteUser}
          />
        ))}
        </tbody>
      </PublisherList.Root>
    </>
  );
}
