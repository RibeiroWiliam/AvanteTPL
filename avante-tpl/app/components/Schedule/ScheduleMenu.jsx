"use client";

import getDay from "@/app/utils/getDay";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import SearchBar from "../Shared/SearchBar";

export default function ScheduleMenu({
  menu,
  closeMenu,
  availabilities,
  saveChanges,
}) {
  const { startTime, endTime, assignment } = menu;
  const shiftLabel = `${getDay(
    startTime
  )} ${startTime.getHours()}:00 - ${endTime.getHours()}:00`;
  const [checkedPublishers, setCheckedPublishers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (assignment) {
      setCheckedPublishers(assignment.publishers);
    }
  }, [assignment]);

  const handleCheckboxChange = (event, publisher) => {
    const { id } = publisher;
    if (event.target.checked) {
      // Se o checkbox estiver marcado, adicionamos ao array de publishers
      setCheckedPublishers((prevPublishers) => [...prevPublishers, publisher]);
    } else {
      // Se o checkbox estiver desmarcado, removemos do array de publishers
      setCheckedPublishers((prevPublishers) =>
        prevPublishers.filter((publisher) => publisher.id !== id)
      );
    }
  };

  const handleSave = () => {
    assignment.publishers = [...checkedPublishers];
    saveChanges(assignment);
  };

  return (
    <Modal.Root width="w-96">
      <Modal.Toggler closeMenu={closeMenu} />
      <Modal.Title>{shiftLabel}</Modal.Title>
      <SearchBar setSearch={setSearch}/>
      {assignment && assignment.publishers.length > 0 && (
        <>
          <h3 className="font-bold text-gray-500 mt-4 mb-1">
            Publicadores Selecionados
          </h3>
          <ul>
            {assignment.publishers
              .sort((a, b) => {
                const nameA = a.name.toUpperCase(); // converte o nome para maiúsculas
                const nameB = b.name.toUpperCase(); // converte o nome para maiúsculas

                if (nameA < nameB) {
                  return -1; // Retorna um número negativo se a vem antes de b
                }
                if (nameA > nameB) {
                  return 1; // Retorna um número positivo se a vem depois de b
                }
                return 0; // Retorna 0 se os nomes forem iguais
              })
              .map((publisher, index) => (
                <li key={index} className="flex gap-4">
                  <input
                    defaultChecked
                    type="checkbox"
                    id={publisher.id}
                    value={publisher}
                    onChange={(event) => handleCheckboxChange(event, publisher)}
                  />
                  <label htmlFor={publisher.id}>{publisher.name}</label>
                </li>
              ))}
          </ul>
        </>
      )}
      {availabilities && availabilities.length > 0 && (
        <>
          <h3 className="font-bold text-gray-500 mt-4 mb-1">
            Publicadores Disponíveis
          </h3>
          <ul className="mb-4">
            {availabilities &&
              availabilities
                .filter(availability => availability.publisher.name.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => {
                  const nameA = a.publisher.name.toUpperCase(); // converte o nome para maiúsculas
                  const nameB = b.publisher.name.toUpperCase(); // converte o nome para maiúsculas

                  if (nameA < nameB) {
                    return -1; // Retorna um número negativo se a vem antes de b
                  }
                  if (nameA > nameB) {
                    return 1; // Retorna um número positivo se a vem depois de b
                  }
                  return 0; // Retorna 0 se os nomes forem iguais
                })
                .map((availability) => (
                  <li key={availability.id} className="flex gap-4">
                    <input
                      type="checkbox"
                      id={availability.publisher.id}
                      value={availability.publisher}
                      onChange={(event) =>
                        handleCheckboxChange(event, availability.publisher)
                      }
                    />
                    <label htmlFor={availability.publisher.id}>
                      {availability.publisher.name}
                    </label>
                  </li>
                ))}
          </ul>
        </>
      )}
      {assignment.publishers.length === 0 && availabilities.length === 0 && (
        <div className="py-4 text-center w-full text-gray-400">
          Não há publicadores disponíveis.
        </div>
      )}
      <div className="flex gap-4 justify-between">
        <Modal.Button onClick={closeMenu} variant="outline" type="button">
          Cancelar
        </Modal.Button>
        <Modal.Button
          onClick={handleSave}
          disabled={checkedPublishers.length <= 0}
        >
          Salvar
        </Modal.Button>
      </div>
    </Modal.Root>
  );
}
