"use client";

import getDay from "@/app/utils/getDay";
import { useEffect, useState } from "react";

export default function ScheduleMenu({
  menu,
  closeMenu,
  availabilities,
  saveChanges,
}) {
  const { startTime, endTime, position, assignment } = menu;
  const shiftLabel = `${getDay(
    startTime
  )} ${startTime.getHours()}:00 - ${endTime.getHours()}:00`;
  const [checkedPublishers, setCheckedPublishers] = useState([]);

  useEffect(() => {
    if(assignment){
      setCheckedPublishers(assignment.publishers)
    }    
  }, [])

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
    <div
      className="absolute mt-8 mx-auto w-1/4 bg-white border border-gray-300 rounded-lg p-4 z-10"
      style={{ left: position.x, top: position.y }}
    >
      <button
        onClick={closeMenu}
        className="absolute top-2 right-2 text-gray-800 hover:text-red-600"
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <h3 className="text-lg text-gray-900 font-semibold mb-2 text-center">
        {shiftLabel}
      </h3>
      <div className="flex bg-gray-100 p-2 px-4 gap-4 w-full rounded-lg">
        <i className="bi bi-search text-gray-400"></i>
        <input
          className="outline-none bg-gray-100 w-full"
          type="text"
          placeholder="Nome do publicador..."
        />
      </div>    
      <form action="">
        <ul className="p-4">
          {assignment &&
            assignment.publishers.map((publisher, index) => (
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
          {availabilities &&
            availabilities.map((availability) => (
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
          {(assignment && assignment.publishers.length === 0) ||
            (!assignment && availabilities && availabilities.length === 0 && (
              <div className="text-center w-full text-gray-400">
                Não há publicadores disponíveis.
              </div>
            ))}
        </ul>
        <button
          type="button"
          onClick={() => handleSave()}
          className="w-full rounded-lg bg-blue-600 text-white p-2 px-4 hover:bg-blue-500 transition cursor"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
