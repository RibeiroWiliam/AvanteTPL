"use client";

import Select from 'react-select'
import getMonth from "@/app/utils/getMonth";
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
  isSameMonth,
} from "date-fns";

export default function WeeklyDatePicker({ selectedWeek, onWeekChange }) {
  const generateLabel = (start, end) => {
    const startDay = format(start, "d");
    const endDay = format(end, "d");
    const startMonth = getMonth(start)
    const endMonth = getMonth(end)
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

  const options = weeks.map((week, index) => ({
    value: index,
    label: week.label
  }))

  return (
    <div className="flex gap-4 items-center">
      <Select
      defaultValue = {
        options.filter(option => 
           option.value === 0)
      }
      options={options}
      onChange={(selectedOption) => {
        const selectedWeekNumber = parseInt(selectedOption.value) + 1;
        const newDate = addWeeks(startOfWeek(new Date()), selectedWeekNumber - 1);
        onWeekChange(newDate);
      }}
    />
    </div>
  );
}
