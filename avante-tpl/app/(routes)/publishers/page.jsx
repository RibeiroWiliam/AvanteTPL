"use client"

import { PublisherList } from "@/app/components/PublisherList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Publishers(){
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    async function fetchPublishers() {
      try {
        const response = await axios.get('/api/publishers');
        const {publishers} = response.data
        setPublishers(publishers); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error('Erro ao buscar dados dos publicadores:', error);
      }
    }
    fetchPublishers();
  }, []);
  

  return (
    <main>
      <div className="flex justify-between mb-4">
      <h1 className="text-3xl text-blue-800 font-bold">Publicadores</h1>
      <a href="/publishers/new" className="rounded-lg bg-blue-800 text-white p-2 px-4 hover:bg-indigo-600 transition cursor">Novo Publicador</a>
      </div>      
      <PublisherList.Root>
      {publishers.map(publisher => (
          <PublisherList.Item key={publisher.id} text={publisher.name}/>
      ))}
      </PublisherList.Root>
    </main>
  )
}

