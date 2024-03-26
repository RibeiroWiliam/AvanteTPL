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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input type="text" name="name" onChange={handleChange} className="outline block"/>
        <label>Senha</label>
        <input type="password" name="password" onChange={handleChange} className="outline block"/>
        <button type="submit" className="rounded-md bg-red-800">Cadastrar</button>
      </form>
    </main>
  )
}