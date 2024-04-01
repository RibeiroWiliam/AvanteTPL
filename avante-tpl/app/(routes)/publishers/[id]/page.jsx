"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Availability } from "@/app/components/Availability";
import usePublisher from "@/app/hooks/usePublisher";
import { useSession } from "next-auth/react";

export default function Publisher() {
  const {data: session, status} = useSession()
  console.log(session)
  const { id } = useParams();
  const { publisher, loading, error, fetchData } = usePublisher(id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(publisher)

  // Função para lidar com o envio do POST request
  async function addAvailability() {
    try {
      // Aqui você precisa adaptar para obter a data correta
      // Vou assumir que você tem uma função para isso chamada getSelectedDate()
      const selectedDate = getSelectedDate();
      const startTime = `${selectedDate} ${selectedPeriod.split(" - ")[0]}`;
      const endTime = `${selectedDate} ${selectedPeriod.split(" - ")[1]}`;

      // Fazer o POST request
      await axios.post("/api/availabilities", {
        publisherId: id,
        startTime,
        endTime,
      });

      // Aqui você pode adicionar uma lógica para atualizar o estado ou fazer outra coisa após o sucesso
    } catch (error) {
      console.error("Erro ao adicionar disponibilidade:", error);
    }
  }

  function handlePeriodSelection(period) {
    setSelectedPeriod(period);
    setIsMenuOpen(false); // Fecha o menu após a seleção
    addAvailability();
  }

  return (
    <>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error.message}</p>}
      {publisher && (
        <>
          <h1 className="text-3xl text-indigo-700 font-bold mb-4">
            {publisher.name}
          </h1>
          <h2 className="text-2xl my-4 text-gray-700 font-bold ">
            Disponibilidades
          </h2>
          <section className="grid grid-cols-2 gap-16">
            <div>
              <span className="block text-xl text-gray-700 font-bold mb-2">
                Segunda-feira
              </span>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <Availability.Card color="bg-green-600">
                  06:00 - 08:00
                </Availability.Card>
                <Availability.Card color="bg-yellow-500">
                  06:00 - 08:00
                </Availability.Card>
                <Availability.Button
                  onClick={() => setIsMenuOpen(true)}
                  color="bg-gray-600 hover:bg-gray-500 transition"
                >
                  Adicionar <i className="bi bi-plus-lg"></i>
                </Availability.Button>
              </div>
            </div>
            <div>
              <span className="block text-xl text-gray-700 font-bold mb-2">
                Terça-feira
              </span>
              <div className="grid grid-cols-3 gap-2">
                <Availability.Card color="bg-green-600">
                  06:00 - 08:00
                </Availability.Card>
                <Availability.Card color="bg-yellow-500">
                  06:00 - 08:00
                </Availability.Card>
                <Availability.Button
                  onClick={() => setIsMenuOpen(true)}
                  color="bg-gray-600 hover:bg-gray-500 transition"
                >
                  Adicionar <i className="bi bi-plus-lg"></i>
                </Availability.Button>
              </div>
            </div>
          </section>

          {/* Menu de seleção */}
          {isMenuOpen && (
            <div className="absolute top-0 left-0 right-0 mt-8 mx-auto w-60 bg-white border border-gray-300 rounded-lg p-4 z-10">
              <h3 className="text-lg font-semibold mb-2">Selecionar período</h3>
              <ul className="space-y-2">
                {[
                  "06:00 - 08:00",
                  "08:00 - 10:00",
                  "10:00 - 12:00",
                  "14:00 - 16:00",
                  "16:00 - 18:00",
                  "18:00 - 20:00",
                ].map((period) => (
                  <li
                    key={period}
                    onClick={() => handlePeriodSelection(period)}
                    className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                  >
                    {period}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg"
              >
                Fechar
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
