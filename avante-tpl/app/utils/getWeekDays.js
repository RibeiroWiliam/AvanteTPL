import { startOfWeek, endOfWeek, addDays } from 'date-fns';

function getWeekDays(selectedDate) {
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const days = [];

  let currentDate = weekStart;
  while (currentDate <= weekEnd) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return days;
}

export default getWeekDays;
