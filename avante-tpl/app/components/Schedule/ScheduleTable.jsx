import { shifts } from "@/app/constants/shifts";
import getDay from "../../utils/getDay";

export default function ScheduleTable({ day, assignments, openMenu }) {
  const getCellDate = (shift) => {
    return new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      shift.startTime.split(":")[0],
      shift.startTime.split(":")[1]
    );
  }

  const compareDateTime = (assignment, shift) => {
    const cellDate = getCellDate(shift)
    const assignmentDate = new Date(assignment.startTime);
    return assignmentDate.getTime() === cellDate.getTime();
  };

  return (
    <table className="table-auto border-collapse my-4 w-full text-center">
      <thead>
        <tr>
          <th colSpan={shifts.length} className="p-2 bg-blue-800 text-white">
            {getDay(day)}
          </th>
        </tr>
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
      </thead>
      <tbody>
        <tr>
          {shifts.map((shift, shiftIndex) => (
            <td key={shiftIndex} className="px-4 py-2 border">
              {
                assignments.length > 0 &&
                assignments.find((assignment) => {
                  return (
                    compareDateTime(assignment, shift) &&
                    assignment.publishers.length > 0
                  );
                }) ?
                assignments
                  .find((assignment) => {
                    return (
                      compareDateTime(assignment, shift) &&
                      assignment.publishers.length > 0
                    );
                  })
                  .publishers.map((publisher) => (
                    <a href={`/publishers/${publisher.id}`} key={publisher.id} className="block py-2 hover:text-blue-700 transition">{publisher.name}</a>
                  )): <span className="text-gray-300">Disponível</span>}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
