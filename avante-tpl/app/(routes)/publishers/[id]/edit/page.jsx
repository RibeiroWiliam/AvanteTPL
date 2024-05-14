"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import usePublisher from "@/app/hooks/usePublisher";
import Title from "@/app/components/Shared/Title";

export default function EditPublisher() {
  const router = useRouter();
  const { id } = useParams();
  const { publisher } = usePublisher(id);
  console.log(publisher);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    isAdmin: false,
    pioneer: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.pioneer === "Nao") {
      const { name, password, isAdmin } = formData;
      await setFormData({ name, password, isAdmin });
    }

    try {
      const response = await axios.put(`/api/publishers/${id}`, formData);
      console.log(response.data); // Feedback para o usuário
      router.push("/publishers");
    } catch (error) {
      console.error("Erro ao cadastrar publicador:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {publisher && (
        <>
          <Title>Editar Publicador ({publisher.name})</Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 mt-4">
            <section className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  defaultValue={publisher.name}
                  className="block px-4 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <label className="block mb-2">Senha</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  defaultValue={publisher.password}
                  className="block px-4 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex gap-8">
                <div className="flex gap-2 items-center">
                  <label htmlFor="isAdm">É Administrador?</label>
                  <select
                    name="isAdmin"
                    id="isAdmin"
                    onChange={handleChange}
                    defaultValue={publisher.isAdmin}
                    className="p-2 rounded-lg bg-white border-2 border-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  >
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                  </select>
                </div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="pioneer">É Pioneiro?</label>
                  <select
                    name="pioneer"
                    id="pioneer"
                    onChange={handleChange}
                    defaultValue={
                      publisher.pioneer ? publisher.pioneer : "Nao"
                    }
                    className="p-2 rounded-lg bg-white border-2 border-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  >
                    <option value={"Regular"}>Pioneiro Regular</option>
                    <option value={"Auxiliar"}>Pioneiro Auxiliar</option>
                    <option value={"Nao"}>Não</option>
                  </select>
                </div>
              </div>
            </section>
            <button
              type="submit"
              className=" bottom-8 bg-primary text-white px-4 py-2 hover:bg-hover transition duration-300 rounded-lg"
            >
              Salvar
            </button>
          </form>
        </>
      )}
    </>
  );
}
