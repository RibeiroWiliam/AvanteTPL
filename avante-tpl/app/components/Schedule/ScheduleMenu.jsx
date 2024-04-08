"use client";

import getDay from "@/app/utils/getDay";

export default function ScheduleMenu({
  menu,
  closeMenu,
  assignment,
  availabilities,
}) {
  const dayActive = () => {
    const { day, shift } = menu;
    return new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      shift.startTime.split(":")[0],
      shift.startTime.split(":")[1]
    );
  };

  const endTime = () => {
    return new Date(
      menu.day.getFullYear(),
      menu.day.getMonth(),
      menu.day.getDate(),
      menu.shift.endTime.split(":")[0],
      menu.shift.endTime.split(":")[1]
    );
  };

  return (
    <div
      className="absolute mt-8 mx-auto w-1/4 bg-white border border-gray-300 rounded-lg p-4 z-10"
      style={{ left: menu.position.x, top: menu.position.y }}
    >
      <button
        onClick={closeMenu}
        className="absolute top-2 right-2 text-gray-800 hover:text-red-600"
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <h3 className="text-lg text-gray-900 font-semibold mb-2 text-center">
        {getDay(menu.day) + " " + menu.shift.label}
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
                />
                {publisher.name}
              </li>
            ))}
          {availabilities &&
            availabilities
              .map(availability => (
                <li key={availability.id} className="flex gap-4">
                  <input
                    type="checkbox"
                  />
                  {availability.publisher.name}
                </li>
              ))}
          {(assignment && assignment.publishers.length === 0) ||
          (!assignment && availabilities && availabilities.length === 0) && (
          <div className="text-center w-full text-gray-400">Não há publicadores disponíveis.</div>
        )}
        </ul>
        <button className="w-full rounded-lg bg-blue-600 text-white p-2 px-4 hover:bg-blue-500 transition cursor">
          Salvar
        </button>
      </form>
    </div>
  );
}
