"use client";

import useEquipments from "@/app/hooks/useEquipments";
import useAvailabilities from "@/app/hooks/useAvailabilities";
import { useEffect, useState } from "react";
import { shifts } from "@/app/constants/shifts";
import { weekdays } from "@/app/constants/weekdays";

export default function Schedule() {
  const { equipments, loading } = useEquipments();
  const [activeSchedule, setActiveSchedule] = useState(0);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (equipments) {
      setActiveSchedule(equipments[0].id);
    }
  }, [equipments]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl text-blue-700 font-bold mb-4">
          Programação TPL - Aruana
        </h1>
        <div className="flex gap-4">
          <button>
            <i className="bi bi-calendar4-week text-blue-600 text-3xl"></i>
          </button>
          <button>
            <i className="bi bi-floppy text-blue-600 text-3xl"></i>
          </button>
          <button>
            <i className="bi bi-printer text-blue-600 text-3xl"></i>
          </button>
        </div>
      </div>

      {equipments &&
        equipments.map((equipment) => (
          <button
            onClick={() => setActiveSchedule(equipment.id)}
            key={equipment.id}
            className={`${
              activeSchedule === equipment.id
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-300 hover:text-blue-700"
            } font-bold px-4 py-2`}
          >
            {equipment.name}
          </button>
        ))}
      {weekdays.map((day, index) => (
        <table
          key={index}
          className="table-auto border-collapse my-4 w-full text-center"
        >
          <tr>
            <th colSpan={shifts.length} className="p-2 bg-blue-800 text-white">
              {day.label}
            </th>
          </tr>
          <tr>
            {shifts.map((shift) => (
              <th className={`${shift.color} p-4 text-white border`}>
                {shift.label}
              </th>
            ))}
          </tr>
          <tr>
            {shifts.map((shift) => (
              <td className="p-4 border-x">Wiliam Ribeiro</td>
            ))}
          </tr>
          <tr>
            {shifts.map((shift) => (
              <td className="p-4 border-x">Wiliam Ribeiro</td>
            ))}
          </tr>
          <tr>
            {shifts.map((shift) => (
              <td className="p-4 border-x border-b"></td>
            ))}
          </tr>
        </table>
      ))}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 opacity-50 z-50 flex items-center justify-center">
          Carregando...
        </div>
      )}
    </>
  );
}
