"use client";

import Loading from "@/app/components/Shared/Loading";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import getDay from "@/app/utils/getDay";
import getMonth from "@/app/utils/getMonth";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
} from "date-fns";
import Title from "@/app/components/Shared/Title";

export default function Assignments() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Esta semana");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/publishers/${session.user.id}/assignments/`
        );
        setAssignments(response.data.assignments);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (session) {
      fetchAssignments();
    }
  }, [session]);

  const renderPublishersList = (publishers) => {
    const length = publishers.length;
    if (length === 0) return "Nenhum publisher";
    if (length === 1) return publishers[0].name;
    if (length === 2) return `${publishers[0].name} e ${publishers[1].name}`;

    // Se houver mais de 2 publishers
    const names = publishers.map((publisher) => publisher.name);
    const lastPublisher = names.pop();
    return `${names.join(", ")} e ${lastPublisher}`;
  };

  const filters = ["Todos", "Hoje", "Esta semana", "Este mês"];

  const applyFilter = (assignments, filter) => {
    const today = new Date();
    switch (filter) {
      case "Esta semana":
        const startOfWeekDate = startOfWeek(today);
        const endOfWeekDate = endOfWeek(today);
        return assignments.filter(
          (assignment) =>
            new Date(assignment.startTime) >= startOfWeekDate &&
            new Date(assignment.endTime) <= endOfWeekDate
        );
      case "Este mês":
        const startOfMonthDate = startOfMonth(today);
        const endOfMonthDate = endOfMonth(today);
        return assignments.filter(
          (assignment) =>
            isSameMonth(new Date(assignment.startTime), startOfMonthDate) &&
            isSameMonth(new Date(assignment.endTime), endOfMonthDate)
        );
      case "Hoje":
        const startOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const endOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59
        );
        return assignments.filter(
          (assignment) =>
            new Date(assignment.startTime) >= startOfToday &&
            new Date(assignment.endTime) <= endOfToday
        );
      default:
        return assignments;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between mb-4">
        {/* Title */}
        <Title>Designações</Title>
      </div>

      {/* Filter Buttons */}
      {filters &&
        filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`${
              activeFilter === filter
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-primary"
            } font-bold px-4 py-2`}
          >
            {filter}
          </button>
        ))}

      {/* Assignments Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {assignments &&
          applyFilter(assignments, activeFilter)
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map((assignment) => {
              const { publishers, equipment } = assignment;
              const startTime = new Date(assignment.startTime);
              const endTime = new Date(assignment.endTime);
              return (
                <div
                  className="shadow-lg bg-white p-4 rounded-xl"
                  key={assignment.id}
                >
                  <div className="flex justify-between">
                    <h2 className="font-bold text-lg">{`${getDay(
                      assignment.startTime
                    )} - ${startTime.getDate()} de ${getMonth(startTime)}`}</h2>
                    <button>
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <div className="flex gap-2 text-gray-500">
                      <i className="bi bi-clock-fill"></i>{" "}
                      {`${startTime.getHours()}:00 - ${endTime.getHours()}:00`}
                    </div>
                    <div className="flex gap-2 text-gray-500">
                      <i className="bi bi-geo-alt-fill"></i> {equipment.name}
                    </div>
                    <div className="flex gap-2 text-gray-500">
                      <i className="bi bi-people-fill"></i>
                      <span>{renderPublishersList(publishers)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
      </section>

      {/* Loading Indicator */}
      {loading && <Loading />}
    </>
  );
}
