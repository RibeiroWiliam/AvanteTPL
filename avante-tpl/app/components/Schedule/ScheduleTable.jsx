import { shifts } from "@/app/constants/shifts";
import getDay from "../../utils/getDay";
import { useState } from "react";
import getMonth from "@/app/utils/getMonth";
import { getShiftDate } from "@/app/utils/getShiftDate";

export default function ScheduleTable({ day, assignments, openMenu }) {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const compareDateTime = (assignment, shift) => {
    const cellDate = getShiftDate(day, shift);
    const assignmentDate = new Date(assignment.startTime);
    return assignmentDate.getTime() === cellDate.getTime();
  };

  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full table-auto border-collapse text-center shadow">
        <thead>
          <tr>
            <th
              colSpan={shifts.length}
              className="p-2 bg-blue-800 text-white relative text-sm md:text-base"
              onClick={toggleExpanded}
            >
              {expanded ? (
                <button className="absolute right-4 hover:text-gray-300">
                  <i className="bi bi-chevron-up"></i>
                </button>
              ) : (
                <button className="absolute right-4 hover:text-gray-300">
                  <i className="bi bi-chevron-down"></i>
                </button>
              )}
              {getDay(day)} - {day.getDate()} de {getMonth(day)}
            </th>
          </tr>
          {expanded && (
            <tr>
              {shifts.map((shift, index) => (
                <th
                  key={index}
                  onClick={(e) =>
                    openMenu(day, shift, e.target.getBoundingClientRect())
                  }
                  className={`${shift.color} p-2 lg:p-4 text-white border cursor-pointer text-sm md:text-base text-nowrap`}
                >
                  {shift.label}
                </th>
              ))}
            </tr>
          )}
        </thead>
        {expanded && (
          <tbody>
            <tr>
              {shifts.map((shift, shiftIndex) => (
                <td key={shiftIndex} className="lg:px-4 p-2 border bg-white">
                  {assignments.length > 0 &&
                  assignments.find((assignment) => {
                    return (
                      compareDateTime(assignment, shift) &&
                      assignment.publishers.length > 0
                    );
                  }) ? (
                    assignments
                      .find((assignment) => {
                        return (
                          compareDateTime(assignment, shift) &&
                          assignment.publishers.length > 0
                        );
                      })
                      .publishers.map((publisher) => (
                        <a
                          href={`/publishers/${publisher.id}`}
                          key={publisher.id}
                          className="block py-2 hover:text-blue-700 transition"
                        >
                          {publisher.name}
                        </a>
                      ))
                  ) : (
                    <span className="text-gray-300">Disponível</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
