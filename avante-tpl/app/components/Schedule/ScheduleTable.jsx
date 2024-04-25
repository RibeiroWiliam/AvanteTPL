import { shifts } from "@/app/constants/shifts";
import getDay from "../../utils/getDay";
import { useState } from "react";
import getMonth from "@/app/utils/getMonth";
import { getShiftDate } from "@/app/utils/getShiftDate";

export default function ScheduleTable({ day, assignments, openMenu }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const compareDateTime = (assignment, shift) => {
    const cellDate = getShiftDate(day, shift);
    const assignmentDate = new Date(assignment.startTime);
    return assignmentDate.getTime() === cellDate.getTime();
  };

  return (
    <table className="table-auto border-collapse my-4 text-center shadow">
      <thead>
        <tr>
          <th
            colSpan={shifts.length}
            className="p-2 bg-blue-800 text-white relative"
            onClick={toggleExpanded}
          >
            {expanded ? (
              <button className="absolute right-4 hover:text-gray-300"><i className="bi bi-chevron-up"></i></button>
              
            ) : (
              <button className="absolute right-4 hover:text-gray-300"><i className="bi bi-chevron-down"></i></button>
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
                className={`${shift.color} p-4 text-white border cursor-pointer`}
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
              <td key={shiftIndex} className="px-4 py-2 border bg-white">
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
  );
}
