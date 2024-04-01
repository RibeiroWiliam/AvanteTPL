"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function NewPublisher(){
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    isAdmin: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/publishers', formData);
      console.log(response.data); // Feedback para o usuário
      router.push("/publishers")

    } catch (error) {
      console.error('Erro ao cadastrar publicador:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,     
    });
  };

  return (
    <>
      <h1 className="text-3xl text-indigo-700 font-bold mb-4">Novo Publicador</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nome</label>
        <input type="text" name="name" onChange={handleChange} className="block px-4 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

        <label className="block mb-2">Senha</label>
        <input type="password" name="password" onChange={handleChange} className="block px-4 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

        <input type="checkbox" name="isAdm" id="isAdm" value="true" onChange={handleChange} className="mb-4" />
        <label className="ml-2" htmlFor="isAdm">É Administrador?</label>
        
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cadastrar</button>
      </form>
    </>
  )
}