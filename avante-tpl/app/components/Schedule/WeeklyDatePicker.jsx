"use client";

import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
  isSameMonth,
} from "date-fns";

export default function WeeklyDatePicker({ selectedWeek, onWeekChange }) {
  const handleWeekChange = (event) => {
    const selectedWeekNumber = parseInt(event.target.value) + 1;
    const newDate = addWeeks(startOfWeek(new Date()), selectedWeekNumber - 1);
    onWeekChange(newDate);
  };
  

  const generateLabel = (start, end) => {
    const startDay = format(start, "d");
    const endDay = format(end, "d");
    const startMonth = format(start, "MMM");
    const endMonth = format(end, "MMM");
    const sameMonth = isSameMonth(start, end);

    if (sameMonth) {
      return `${startDay}-${endDay} de ${startMonth}`;
    } else {
      return `${startDay} de ${startMonth} - ${endDay} de ${endMonth}`;
    }
  };

  const weeks = [];
  const currentWeek = startOfWeek(new Date());
  for (let i = 0; i <= 8; i++) {
    const weekStart = addWeeks(currentWeek, i);
    const weekEnd = endOfWeek(weekStart);
    const label = generateLabel(weekStart, weekEnd);
    weeks.push({ start: weekStart, end: weekEnd, label });
  }

  return (
    <div className="flex gap-4 items-center">
      <select onChange={handleWeekChange} className="bg-white lg:text-xl">
        {weeks.map((week, index) => (
          <option key={index} value={index}>
            {week.label}
          </option>
        ))}
      </select>
      <button>
        <i className="bi bi-calendar4-week text-blue-600 text-2xl lg:text-3xl"></i>
      </button>
    </div>
  );
}
