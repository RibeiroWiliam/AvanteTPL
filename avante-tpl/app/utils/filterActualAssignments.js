import { startOfWeek, endOfWeek } from "date-fns";

export const filterActualAssignments = (assignments) => {
  const today = new Date();

  const startOfWeekDate = startOfWeek(today);
  const endOfWeekDate = endOfWeek(today);
  console.log(assignments.filter(
    (assignment) =>
      new Date(assignment.startTime) >= startOfWeekDate &&
      new Date(assignment.endTime) <= endOfWeekDate
  ))
  return assignments.filter(
    (assignment) =>
      new Date(assignment.startTime) >= startOfWeekDate &&
      new Date(assignment.endTime) <= endOfWeekDate
  );
};
