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
import { shifts } from "@/app/constants/shifts";

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

  const daysWithAvailability = weekdays.filter((day) =>
    publisher?.availabilities.some(
      (availability) => getDay(availability.startTime) === getDay(day.data)
    )
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(loading); 

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const deleteAvailability = async (id) => {
    try {
      await axios.delete(`/api/availabilities/${id}`);
    } catch (error) {
      console.error("Error deleting availability:", error);
    } finally {
      mutate()
    }
  };

  const saveChanges = async menuAvailabilities => {
    const newAvailabilities = menuAvailabilities.filter(availability => availability.addLocally)
    const deletedAvailabilities = menuAvailabilities.filter(availability => availability.deletedLocally)
    setIsMenuOpen(false)
    setIsLoading(true)
    try {
      if(newAvailabilities.length > 0) await axios.post(`/api/availabilities/`, newAvailabilities)
      if(deletedAvailabilities.length > 0){
        for(const availability of deletedAvailabilities){
          await deleteAvailability(availability.id)
        }
      }     
    } catch(error){
      console.error(error)
    } finally {
      mutate()
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap mb-4 gap-4 items-center">
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

        {/* Preferences */}
        <div></div>
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-gray-500 font-bold ">Disponibilidades</h2>
          <ActionButton icon="bi bi-pencil-fill" action={() => setIsMenuOpen(true)}/>
        </div>
        

        <Availability.Root>
          {/* Renderiza apenas os dias com disponibilidades correspondentes */}
          {daysWithAvailability.map((day, index) => (
            <div key={index}>
              <Availability.Title text={day.label} />
              <Availability.Grid>
                {publisher &&
                  publisher.availabilities
                    .filter(
                      (availability) =>
                        getDay(availability.startTime) === getDay(day.data)
                    )
                    .sort((a, b) =>
                      new Date(a.startTime) - new Date(b.startTime)
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
                      const text = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
                      return (
                        <Availability.Card
                          color={shifts.find(shift => shift.label === text).color}
                          onClick={() => deleteAvailability(availability.id)}
                          key={availability.id}
                        >
                          {text}
                        </Availability.Card>
                      );
                    })}
              </Availability.Grid>
            </div>
          ))}
        </Availability.Root>
      </section>

      {isMenuOpen && (
        <AvailabilityMenu
          publisherId={publisher.id}
          availabilities={publisher.availabilities}
          closeMenu={() => setIsMenuOpen(false)}
          saveChanges={availabilities => saveChanges(availabilities)}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}
