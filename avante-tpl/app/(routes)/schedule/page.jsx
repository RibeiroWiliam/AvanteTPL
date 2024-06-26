"use client";

import { useEffect, useState, useCallback } from "react";
import WeeklyDatePicker from "@/app/components/Schedule/WeeklyDatePicker";
import ScheduleMenu from "@/app/components/Schedule/ScheduleMenu";
import ScheduleTable from "@/app/components/Schedule/ScheduleTable";
import useEquipments from "@/app/hooks/useEquipments";
import useAvailabilities from "@/app/hooks/useAvailabilities";
import useAssignments from "@/app/hooks/useAssignments";
import getWeekDays from "@/app/utils/getWeekDays";
import Loading from "@/app/components/Shared/Loading";
import { useSession } from "next-auth/react";
import getDay from "@/app/utils/getDay";
import Title from "@/app/components/Shared/Title";
import ActionButton from "@/app/components/Shared/ActionButton";
import SchedulePDF from "@/app/lib/SchedulePDF";
import PrintButton from "@/app/components/Schedule/PrintButton";
import { getPDFData } from "./printPDF";
import { saveSchedule } from "./actions";
import FlashMessage from "@/app/components/Shared/FlashMessage";
import { getShiftDate } from "@/app/utils/getShiftDate";
import { useRouter } from "next/navigation";
import usePublishers from "@/app/hooks/usePublishers";
import UsersMenu from "@/app/components/Schedule/UsersMenu";
import { equipmentColors } from "@/app/constants/equipmentColors";

const compareDateTime = (date1, date2) => {
  return (
    getDay(date1) === getDay(date2) && date1.getHours() === date2.getHours()
  );
};

export default function Schedule() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { publishers } = usePublishers();
  const { equipments } = useEquipments();
  const { availabilities } = useAvailabilities();
  const {
    assignments,
    setAssignments,
    loading: assignmentsLoading,
  } = useAssignments();
  const [isLoading, setIsLoading] = useState(false);
  const [activeEquipment, setActiveEquipment] = useState(0);
  const [activeWeek, setActiveWeek] = useState(new Date());
  const [menu, setMenu] = useState({
    isOpen: false,
    startTime: new Date(),
    endTime: new Date(),
    assignment: null,
  });
  const [message, setMessage] = useState({
    isOpen: false,
    content: {},
  });

  useEffect(() => {
    if (status && status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  useEffect(() => {
    if (equipments) {
      setActiveEquipment(equipments[0]?.id || 0);
    }
  }, [equipments]);

  useEffect(() => {
    setIsLoading(assignmentsLoading);
  }, [assignmentsLoading]);

  const handleWeekChange = (newWeek) => {
    setActiveWeek(newWeek);
  };

  const openMenu = useCallback(
    (day, shift) => {
      const startTime = getShiftDate(day, shift);
      const endTime = getShiftDate(day, shift, "endTime");

      setMenu((prevMenu) => ({
        ...prevMenu,
        isOpen: true,
        startTime,
        endTime,
        assignment: assignments.find(
          (assignment) =>
            new Date(assignment.startTime).getTime() === startTime.getTime() &&
            assignment.equipmentId === activeEquipment
        )
          ? assignments.find(
              (assignment) =>
                new Date(assignment.startTime).getTime() ===
                  startTime.getTime() &&
                assignment.equipmentId === activeEquipment
            )
          : {
              id: assignments.length
                ? assignments[assignments.length - 1].id + 1
                : 1,
              startTime,
              endTime,
              equipmentId: activeEquipment,
              publishers: [],
              addLocally: true,
            },
      }));
    },
    [assignments, activeEquipment]
  );

  const closeMenu = useCallback(() => {
    setMenu((prevMenu) => ({ ...prevMenu, isOpen: false }));
  }, []);

  const filterAssignments = day => {
    const filteredAssignments = assignments.filter((assignment) => {
      const assignmentDate = new Date(assignment.startTime);
      return (
        assignmentDate.getDate() === day.getDate() &&
        assignment.equipmentId === activeEquipment
      );
    });
    return filteredAssignments;
  };

  const filterAvailabilities = (startTime, assignment) => {
    const filteredAvailabilities = availabilities.filter(availability => {
      const availabilityDate = new Date(availability.startTime);

      /* Filtra os publicadores ja designados naquele horario */
      if (
        assignment.publishers.find(
          publisher => publisher.id === availability.publisherId
        )
      )
        return false;
       /* FIltra as disponibilidades com horarios diferentes */
      if (!compareDateTime(availabilityDate, startTime)) return false;
      return true;
    });
    console.log(startTime, filteredAvailabilities);
    return filteredAvailabilities;
  };

  const saveChanges = (modifiedAssignment) => {
    const foundAssignmentIndex = assignments.findIndex(
      (assignment) => assignment.id === modifiedAssignment.id
    );

    if (foundAssignmentIndex !== -1) {
      if (!assignments[foundAssignmentIndex].addLocally) {
        modifiedAssignment.modifiedLocally = true;
      }

      const updatedAssignments = [...assignments];
      updatedAssignments[foundAssignmentIndex] = modifiedAssignment;
      setAssignments(updatedAssignments);
    } else {
      setAssignments((prevAssignments) => [
        ...prevAssignments,
        modifiedAssignment,
      ]);
    }

    closeMenu();
  };

  const handleSave = async () => {
    setIsLoading(true);
    const response = await saveSchedule(assignments);
    setIsLoading(false);
    setMessage({
      isOpen: true,
      content: response,
    });
    router.refresh();
  };

  const [usersMenu, setUsersMenu] = useState(false);

  return (
    <>
      <section className="">
        {/* Header */}
        <div className="flex flex-wrap justify-center sm:justify-between mb-4 gap-4 items-center">
          {/* Title */}
          <Title>Programação TPL - Aruana</Title>
          {/* Date Picker and Actions */}
          <div className="flex gap-4 items-center">
            <WeeklyDatePicker onWeekChange={handleWeekChange} />
            <ActionButton action={handleSave} icon="bi bi-floppy-fill" />
            <ActionButton
              action={() => setUsersMenu(true)}
              icon="bi bi-people-fill"
            />
            {getPDFData(equipments, assignments, activeWeek) && (
              <PrintButton
                document={
                  <SchedulePDF
                    data={getPDFData(equipments, assignments, activeWeek)}
                  />
                }
              />
            )}
          </div>
        </div>

        {/* Equipment Buttons */}
        {equipments &&
          equipments.map((equipment, index) => (
            <button
              key={equipment.id}
              onClick={() => setActiveEquipment(equipment.id)}
              className={`${
                activeEquipment === equipment.id
                  ? `${equipmentColors[index].text} border-b-2 ${equipmentColors[index].border}`
                  : `text-gray-400 ${equipmentColors[index].hover}`
              } px-4 py-2`}
            >
              {equipment.name}
            </button>
          ))}
      </section>

      {/* Schedule Grid */}
      <section className="pt-4 flex flex-col gap-4">
        {assignments &&
          getWeekDays(activeWeek).map((day, index) => (
            <ScheduleTable
              key={index}
              day={day}
              assignments={filterAssignments(day)}
              openMenu={openMenu}
              color={equipmentColors[activeEquipment - 1].bg}
            />
          ))}
      </section>

      {/* Assignments Menu */}
      {session?.user.isAdmin && menu.isOpen && (
        <ScheduleMenu
          menu={menu}
          closeMenu={closeMenu}
          availabilities={filterAvailabilities(menu.startTime, menu.assignment)}
          saveChanges={saveChanges}
        />
      )}

      {/* Users Menu */}
      {usersMenu && (
        <UsersMenu
          assignments={assignments}
          publishers={publishers}
          closeMenu={() => setUsersMenu(false)}
        />
      )}

      {/* Flash Message */}
      {message.isOpen && (
        <FlashMessage
          message={message.content}
          closeMessage={() => setMessage({ ...message, isOpen: false })}
        />
      )}

      {/* Loading Indicator */}
      {isLoading && <Loading />}
    </>
  );
}
