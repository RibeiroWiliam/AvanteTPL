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

export default function Schedule() {
  const { data: session } = useSession();
  const { equipments } = useEquipments();
  const { availabilities } = useAvailabilities();
  const { assignments, setAssignments, loading: assignmentsLoading } = useAssignments();
  console.log(assignments)
  const [activeEquipment, setActiveEquipment] = useState(0);
  const [activeWeek, setActiveWeek] = useState(new Date());
  const [menu, setMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    startTime: new Date(),
    endTime: new Date(),
    assignment: null,
  });

  useEffect(() => {
    if (equipments) {
      setActiveEquipment(equipments[0]?.id || 0);
    }
  }, [equipments]);

  const handleWeekChange = useCallback((newWeek) => {
    setActiveWeek(newWeek);
  }, []);

  const openMenu = useCallback((day, shift, buttonRect) => {
    const startTime = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      shift.startTime.split(":")[0],
      shift.startTime.split(":")[1]
    );

    const endTime = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      shift.endTime.split(":")[0],
      shift.endTime.split(":")[1]
    );

    setMenu((prevMenu) => ({
      ...prevMenu,
      isOpen: true,
      position: { x: buttonRect.left, y: buttonRect.top },
      startTime,
      endTime,
      assignment: assignments.find(
        (assignment) =>
          new Date(assignment.startTime).getTime() === startTime.getTime() &&
          assignment.equipmentId === activeEquipment
      ) ? assignments.find(
        (assignment) =>
          new Date(assignment.startTime).getTime() === startTime.getTime() &&
          assignment.equipmentId === activeEquipment
      ) :
      {
        id: assignments[assignments.length - 1].id + 1,
        startTime,
        endTime,
        equipmentId: activeEquipment,
        publishers: [],
        addLocally: true
      },
    }));
  }, [assignments]);

  const closeMenu = useCallback(() => {
    setMenu((prevMenu) => ({ ...prevMenu, isOpen: false }));
  }, []);

  const filterAssignments = (day) => {
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
    const filteredAvailabilities = availabilities.filter((availability) => {
      const availabilityDate = new Date(availability.startTime);
      return compareDateTime(availabilityDate, startTime) && !assignment.publishers.find(publisher => publisher.id === availability.publisher.id);
    });
    return filteredAvailabilities;
  };

  const compareDateTime = (date1, date2) => {
    return (
      getDay(date1) === getDay(date2) && date1.getHours() === date2.getHours()
    );
  };

  const saveChanges = (modifiedAssignment) => {
    const foundAssignmentIndex = assignments.findIndex(assignment => assignment.id === modifiedAssignment.id);
  
    if (foundAssignmentIndex !== -1) {
      if(!assignments[foundAssignmentIndex].addLocally){
        modifiedAssignment.modifiedLocally = true
      }

      const updatedAssignments = [...assignments];
      updatedAssignments[foundAssignmentIndex] = modifiedAssignment;
      setAssignments(updatedAssignments);
    } else {
      setAssignments(prevAssignments => [...prevAssignments, modifiedAssignment]);
    }
    
    closeMenu();
  };  

  return (
    <>
      {/* Header */}
      <div className="flex justify-between">
        {/* Title */}
        <h1 className="text-3xl text-blue-700 font-bold mb-4">
          Programação TPL - Aruana
        </h1>
        {/* Date Picker and Actions */}
        <div className="flex gap-4">
          <WeeklyDatePicker
            selectedWeek={activeWeek}
            onWeekChange={handleWeekChange}
          />
          <button>
            <i className="bi bi-floppy text-blue-600 text-3xl"></i>
          </button>
          <button>
            <i className="bi bi-people text-blue-600 text-3xl"></i>
          </button>
          <button>
            <i className="bi bi-printer text-blue-600 text-3xl"></i>
          </button>
        </div>
      </div>

      {/* Equipment Buttons */}
      {equipments &&
        equipments.map((equipment) => (
          <button
            key={equipment.id}
            onClick={() => setActiveEquipment(equipment.id)}
            className={`${
              activeEquipment === equipment.id
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-300 hover:text-blue-700"
            } font-bold px-4 py-2`}
          >
            {equipment.name}
          </button>
        ))}

      {/* Schedule Grid */}
      {assignments &&
        getWeekDays(activeWeek).map((day, index) => (
          <ScheduleTable
            key={index}
            day={day}
            assignments={filterAssignments(day)}
            openMenu={openMenu}
          />
        ))}

      {/* Menu */}
      {session?.user.isAdmin && menu.isOpen && (
        <ScheduleMenu
          menu={menu}
          closeMenu={closeMenu}
          availabilities={filterAvailabilities(menu.startTime, menu.assignment)}
          saveChanges={saveChanges}
        />
      )}

      {/* Loading Indicator */}
      {assignmentsLoading && <Loading />}
    </>
  );
}
