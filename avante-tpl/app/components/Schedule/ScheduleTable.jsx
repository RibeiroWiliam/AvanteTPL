import { shifts } from "@/app/constants/shifts";
import getDay from "../../utils/getDay";

export default function ScheduleTable({ day, equipment, assignments, openMenu }) {
  const filterAssignment = (assignment, shift) => {
    const tableDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), shift.startTime.split(":")[0], shift.startTime.split(":")[1]);
    const assignmentDate = new Date(assignment.startTime);
    return assignmentDate.getTime() === tableDate.getTime() && assignment.equipmentId === equipment;
  }

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
              onClick={(e) => openMenu(day, shift, e.target.getBoundingClientRect())}
              className={`${shift.color} p-4 text-white border cursor-pointer`}
            >
              {shift.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
        {shifts.map((shift, index) => (
          <td className="p-4 border" key={index}>{assignments && assignments.filter((assignment) => (filterAssignment(assignment, shift))).map((assignment) => (assignment.publisher.name))} </td>              
        ))}
        </tr>     
      </tbody>
    </table>
  );
}