"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPublisher() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    isAdmin: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const response = await axios.post("/api/publishers", formData);
      console.log(response.data); // Feedback para o usuário
      router.push("/publishers");
    } catch (error) {
      console.error("Erro ao cadastrar publicador:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1 className="text-3xl text-indigo-700 font-bold mb-4">
        Novo Publicador
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nome</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="block px-4 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="block mb-2">Senha</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="block px-4 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="mr-2" htmlFor="isAdm">
          É Administrador?
        </label>
        <select name="isAdmin" id="isAdmin" onChange={handleChange} defaultValue={false} className="p-2 bg-white border-2 border-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
          <option value={true}>Sim</option>
          <option value={false}>
            Não
          </option>
        </select>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}
