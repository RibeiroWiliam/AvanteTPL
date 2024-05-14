"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { weekdays } from "@/app/constants/weekdays";
import { shifts } from "@/app/constants/shifts";
import { Availability } from "@/app/components/Availability";

export default function NewPublisher() {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    isAdmin: false,
    pioneer: "",
    availabilities: [],
  });

  const [menu, setMenu] = useState({
    day: "Sat Mar 31 2024",
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  const toggleMenu = () => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      isOpen: !prevMenu.isOpen,
    }));
  };

  useEffect(() => {
    if (session && !session.user.isAdmin) {
      router.push("/dashboard");
    }
  }, [router, session]);

  const handleCheckbox = (e) => {
    const startTime = new Date(`${menu.day} ${e.target.value.startTime}`);
    const endTime = new Date(`${menu.day} ${e.target.value.endTime}`);
    const existingAvailability = formData.availabilities.filter(
      (availability) => availability.startTime === startTime
    );
    if (existingAvailability) {
      setFormData({
        ...formData,
        availabilities: formData.availabilities.filter(
          (availability) => availability.startTime !== startTime
        ),
      });
    } else {
      setFormData({
        ...formData,
        availabilities: [
          ...formData.availabilities,
          {
            startTime,
            endTime,
          },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.pioneer === "Nao") {
      const { name, password, isAdmin, availabilities } = formData;
      await setFormData({ name, password, isAdmin, availabilities });
    }

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
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1 className="text-3xl text-blue-700 font-bold mb-4">Novo Publicador</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <section className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-2">Nome</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="block px-4 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label className="block mb-2">Senha</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
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
                defaultValue={false}
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
                defaultValue={"Nao"}
                className="p-2 rounded-lg bg-white border-2 border-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <option value={"Regular"}>Pioneiro Regular</option>
                <option value={"Auxiliar"}>Pioneiro Auxiliar</option>
                <option value={"Nao"}>Não</option>
              </select>
            </div>
          </div>
        </section>
        <section>
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl text-gray-700 font-bold ">
              Disponibilidades
            </h2>
            <button
              type="button"
              onClick={() => toggleMenu()}
              className="text-gray-600 hover:text-blue-600 text-2xl"
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          </div>
          {formData.availabilities.map((availability) => (
            <Availability.Card key={availability.startTime}></Availability.Card>
          ))}
        </section>
        <button
          type="submit"
          className=" bottom-8 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition rounded-lg"
        >
          Cadastrar
        </button>
      </form>
      {menu.isOpen && (
        <form className="absolute mx-auto bg-white border border-gray-300 rounded-lg p-4 z-10 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => toggleMenu()}
            className="absolute top-2 right-2 text-gray-800 hover:text-red-600"
          >
            <i className="bi bi-x-lg"></i>
          </button>
          <select
            name=""
            id=""
            className="p-4 w-full text-center text-lg bg-white"
          >
            {weekdays.map((day) => (
              <option
                key={day.data}
                name="day"
                value={day.data}
                onChange={() => setMenu(...menu, day.data)}
              >
                {day.label}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-4">
            {shifts.map((shift) => (
              <div key={shift.startTime} className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  name="shifts"
                  id={shift.startTime}
                  value={shift}
                />
                <label htmlFor={shift.startTime}>{shift.label}</label>
              </div>
            ))}
          </div>
          {/* <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 w-full hover:bg-green-600 transition rounded-lg"
          >
            Salvar
          </button> */}
        </form>
      )}
    </>
  );
}
