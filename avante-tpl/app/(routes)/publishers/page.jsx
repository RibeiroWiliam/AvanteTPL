"use client";

import { PublisherList } from "@/app/components/PublisherList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    async function fetchPublishers() {
      try {
        const response = await axios.get("/api/publishers");
        const { publishers } = response.data;
        setPublishers(publishers); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar dados dos publicadores:", error);
      }
    }
    fetchPublishers();
  }, []);

  const deleteUser = async (id) => {
    try {
      console.log(id)
      const response = await axios.delete(`/api/publishers/${id}`);
      await fetchPublishers();
    } catch (error) {
      console.error('Erro ao deletar publicador:', error);
    }
  }

  const filters = ["Todos", "Pioneiros", "Administradores"]

  const applyFilter = (publishers, filter) => {
    switch (filter) {
      case "Pioneiros":
        return publishers.filter(
          (publisher) =>
            publisher.pioneer
        );
      case "Administradores":
          return publishers.filter(
            (publisher) =>
              publisher.isAdmin
        );
      default:
        return publishers;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between">
        {/* Title */}
        <h1 className="text-3xl text-blue-700 font-bold mb-4">
          Publicadores
        </h1>
        {/* Date Picker and Actions */}
        <div className="flex gap-4">
          <a href="/publishers/new">
            <i className="bi bi-person-add text-blue-600 text-3xl"></i>
          </a>
        </div>
      </div>
      <div className="flex bg-gray-100 p-2 px-4 gap-4 w-full rounded-lg my-4">
        <i className="bi bi-search text-gray-400"></i>
        <input
          className="outline-none bg-gray-100 w-full"
          type="text"
          placeholder="Nome do publicador..."
        />
      </div>

      {/* Filter Buttons */}
      {filters &&
        filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`${
              activeFilter === filter
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-300 hover:text-blue-700"
            } font-bold px-4 py-2`}
          >
            {filter}
          </button>
        ))}
      
      <PublisherList.Root>
        <PublisherList.Header/>
        <tbody>
        {publishers && applyFilter(publishers, activeFilter).map((publisher) => (
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
