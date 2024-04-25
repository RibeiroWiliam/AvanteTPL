"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import usePublisher from "@/app/hooks/usePublisher";
import { Availability } from "@/app/components/Availability";
import getDay from "@/app/utils/getDay";
import axios from "axios";
import { weekdays } from "@/app/constants/weekdays";
import { shifts } from "@/app/constants/shifts";
import Loading from "@/app/components/Shared/Loading";
import { useSession } from "next-auth/react";
import Title from "@/app/components/Shared/Title";
import ActionButton from "@/app/components/Shared/ActionButton";

export default function Publisher() {
  const { id } = useParams();
  const { publisher, loading, mutate } = usePublisher(id);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      session &&
      session.user.isAdmin === false &&
      session &&
      session.user.id !== id
    ) {
      router.push("/dashboard");
    }
  }, [router, session, id]);

  const [editMode, setEditMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [availabilityData, setAvailabilityData] = useState({
    publisherId: id,
    startTime: "",
    endTime: "",
  });
  const [isLoading, setIsLoading] = useState(loading); // Estado para controlar o carregamento

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const openMenu = (day) => {
    setIsMenuOpen(true);
    setAvailabilityData({
      ...availabilityData,
      startTime: day.data,
      endTime: day.data,
    });
  };

  const addAvailability = async (shift) => {
    setIsLoading(true); // Inicia o carregamento
    const startTime = new Date(
      availabilityData.startTime + " " + shift.startTime
    ).toISOString();
    const endTime = new Date(
      availabilityData.endTime + " " + shift.endTime
    ).toISOString();

    const availability = {
      ...availabilityData,
      startTime,
      endTime,
    };
    try {
      setIsMenuOpen(false);
      const response = await axios.post("/api/availabilities", availability);
      setAvailabilityData({ ...availabilityData, startTime: "", endTime: "" });
      console.log("Availability created:", response.data);
      mutate();
    } catch (error) {
      console.error("Error creating availability:", error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  const deleteAvailability = async (id) => {
    setIsLoading(true); // Inicia o carregamento
    try {
      await axios.delete(`/api/availabilities/${id}`);
      console.log("Availability deleted successfully.");
      mutate();
    } catch (error) {
      console.error("Error deleting availability:", error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap justify-center sm:justify-between mb-4 gap-4 items-center bg-blue-800 p-4 rounded-lg">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <Title text="text-white">{publisher?.name}</Title>
          <div className="flex gap-2 text-white text-sm">
            {publisher?.isAdmin && (
              <div className="bg-orange-500 px-4 py-2 rounded-lg">Administrador</div>
            )}
            {publisher?.pioneer ? (
              <div className="bg-purple-500 px-4 py-2 rounded-lg">Pioneiro {publisher?.pioneer}</div>
            ) : (
              <div className="bg-blue-500 px-4 py-2 rounded-lg">Publicador</div>
            )}
          </div>
        </div>
        {/* Attributes */}
        <div>
            
        </div>
        {/* Actions */}
        <div className="flex gap-4 items-center">
          <ActionButton
            action={() => setEditMode(!editMode)}
            icon={editMode ? "bi bi-floppy-fill" : "bi bi-pencil-fill"}
          />
        </div>
      </div>
      <h2 className="text-2xl my-4 text-gray-700 font-bold ">
        Disponibilidades
      </h2>
      <Availability.Root>
        {weekdays.map((day, index) => (
          <div key={index}>
            <Availability.Title text={day.label} />
            <Availability.Grid>
              {publisher &&
                publisher.availabilities
                  .filter(
                    (availability) =>
                      getDay(availability.startTime) === getDay(day.data)
                  )
                  .map((availability) => {
                    const startTime = new Date(availability.startTime);
                    const endTime = new Date(availability.endTime);
                    const startHours = String(startTime.getHours()).padStart(
                      2,
                      "0"
                    );
                    const endHours = String(endTime.getHours()).padStart(
                      2,
                      "0"
                    );
                    const startMinutes = String(
                      startTime.getMinutes()
                    ).padStart(2, "0");
                    const endMinutes = String(endTime.getMinutes()).padStart(
                      2,
                      "0"
                    );
                    return (
                      <Availability.Card
                        color="bg-blue-600"
                        onClick={() => deleteAvailability(availability.id)}
                        key={availability.id}
                      >
                        {startHours}:{startMinutes} - {endHours}:{endMinutes}
                      </Availability.Card>
                    );
                  })}
              <Availability.Button
                onClick={() => openMenu(day)}
                color="bg-gray-600 hover:bg-gray-500 transition"
              >
                Adicionar <i className="bi bi-plus-lg"></i>
              </Availability.Button>
            </Availability.Grid>
          </div>
        ))}
      </Availability.Root>
      {isMenuOpen && (
        <div className="absolute top-0 left-0 right-0 mt-8 mx-auto w-60 bg-white border border-gray-300 rounded-lg p-4 z-10">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-2 right-2 text-gray-800 hover:text-red-600"
          >
            <i className="bi bi-x-lg"></i>
          </button>
          <h3 className="text-lg text-gray-900 font-semibold mb-2">
            Selecionar período
          </h3>
          <h4 className="text-blue-800 py-2">
            {getDay(availabilityData.startTime)}
          </h4>
          <ul className="space-y-2">
            {shifts.map((shift) => (
              <li
                key={shift.label}
                onClick={() => addAvailability(shift)}
                className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
              >
                {shift.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
}
