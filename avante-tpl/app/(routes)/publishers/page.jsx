"use client";

import { PublisherList } from "@/app/components/PublisherList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Publishers() {
  const [publishers, setPublishers] = useState([]);

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

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl text-indigo-700 font-bold">Publicadores</h1>
        <a
          href="/publishers/new"
          className="rounded-lg bg-indigo-600 text-white p-2 px-4 hover:bg-indigo-500 transition cursor"
        >
          Novo Publicador
        </a>
      </div>
      <div className="flex relative mb-6 mt-4 focus:border-blue-400">
      <label htmlFor="query" className="text-center absolute text-lg p-2 px-4"><i className="bi bi-search"></i></label>
      <input type="search" name="query" id="query" placeholder="Pesquise um publicador" className="w-full outline-none p-2 border-2 border-gray-100 rounded-lg pl-12 focus:border-blue-500"/>
      </div>
      
      <PublisherList.Root>
        <PublisherList.Header/>
        <tbody>
        {publishers.map((publisher) => (
          <PublisherList.Item
            key={publisher.id}
            id={publisher.id}
            name={publisher.name}
            isAdmin={publisher.isAdmin}
            deleteUser={deleteUser}
          />
        ))}
        </tbody>
      </PublisherList.Root>
    </>
  );
}
