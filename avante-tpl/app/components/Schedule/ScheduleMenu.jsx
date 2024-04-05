"use client";

import getDay from "@/app/utils/getDay";
import { useState } from "react";

export default function ScheduleMenu({
  menu,
  closeMenu,
  assignments,
  availabilities,
  equipmentId,
  handleSave,
}) {
  const dayActive = () => {
    return new Date(
      menu.day.getFullYear(),
      menu.day.getMonth(),
      menu.day.getDate(),
      menu.shift.startTime.split(":")[0],
      menu.shift.startTime.split(":")[1]
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

  const compareDateTime = (date1, date2) => {
    return (
      getDay(date1) === getDay(date2) && date1.getHours() === date2.getHours()
    );
  };

  const filterAvailability = (availability) => {
    const availabilityDate = new Date(availability.startTime);
    const conflictingAssignment = menuAssignments.find((assignment) =>
      compareDateTime(new Date(assignment.startTime), availabilityDate) && assignment.publisher.id === availability.publisher.id
    );
    return (
      compareDateTime(availabilityDate, dayActive()) && !conflictingAssignment
    );
  };

  const [menuAssignments, setMenuAssignments] = useState([...assignments]);

  const deleteAssignment = (assignmentId) => {
    const updatedAssignments = menuAssignments.filter(
      (assignment) => assignment.id !== assignmentId
    );
    setMenuAssignments(updatedAssignments);
  };

  const addAssignment = (availability) => {
    const newAssignment = {
      publisherId: availability.publisher.id,
      equipmentId: equipmentId,
      startTime: dayActive(),
      endTime: endTime(),
      publisher: availability.publisher,
      addLocally: true,
    };
    setMenuAssignments([...menuAssignments, newAssignment]);
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
          {menuAssignments &&
            menuAssignments
              .filter(
                (assignment) =>
                  new Date(assignment.startTime).getTime() ===
                  dayActive().getTime()
              )
              .map((assignment, index) => (
                <li key={index} className="flex gap-4">
                  <input
                    defaultChecked
                    onClick={() => deleteAssignment(assignment.id)}
                    type="checkbox"
                  />
                  {assignment.publisher.name}
                </li>
              ))}
          {availabilities &&
            availabilities
              .filter((availability) => filterAvailability(availability))
              .map((availability) => (
                <li key={availability.id} className="flex gap-4">
                  <input
                    type="checkbox"
                    onClick={() => addAssignment(availability)}
                  />
                  {availability.publisher.name}
                </li>
              ))}
        </ul>
        <button
          onClick={handleSave}
          className="w-full rounded-lg bg-blue-600 text-white p-2 px-4 hover:bg-blue-500 transition cursor"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
