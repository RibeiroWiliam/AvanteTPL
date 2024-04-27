"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import usePublisher from "@/app/hooks/usePublisher";
import { Availability } from "@/app/components/Availability";
import getDay from "@/app/utils/getDay";
import axios from "axios";
import { weekdays } from "@/app/constants/weekdays";
import Loading from "@/app/components/Shared/Loading";
import { useSession } from "next-auth/react";
import Title from "@/app/components/Shared/Title";
import ActionButton from "@/app/components/Shared/ActionButton";
import AvailabilityMenu from "./AvailabilityMenu";

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
      <div className="flex flex-wrap justify-between mb-4 gap-4 items-center">
        {/* Title */}

        <Title>{publisher?.name}</Title>
        <div className="flex gap-2 text-sm">
          {publisher?.isAdmin && (
            <div className="bg-orange-200 text-orange-800 px-4 py-2 rounded-lg">
              Administrador
            </div>
          )}
          {publisher?.pioneer ? (
            <div className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg">
              Pioneiro {publisher?.pioneer}
            </div>
          ) : (
            <div className="bg-blue-200 text-blue-800 px-4 py-2 rounded-lg">
              Publicador
            </div>
          )}
        </div>

        {/* Attributes */}
        <div></div>
        {/* Actions */}
        <div className="flex gap-4 items-center">
          <ActionButton
            action={() => setEditMode(!editMode)}
            icon={editMode ? "bi bi-floppy-fill" : "bi bi-pencil-fill"}
          />
        </div>
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl text-gray-500 font-bold ">Disponibilidades</h2>
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
      </section>

      {isMenuOpen && (
        <AvailabilityMenu
          availabilities={publisher.availabilities}
          closeMenu={() => setIsMenuOpen(false)}
          saveChanges={availabilities => saveChanges(availabilities)}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}
