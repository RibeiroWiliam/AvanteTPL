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

export default function WeeklyDatePicker({ onWeekChange }) {
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
  for (let i = -2; i <= 4; i++) {
    const weekStart = addWeeks(currentWeek, i);
    const weekEnd = endOfWeek(weekStart);
    const label = generateLabel(weekStart, weekEnd);
    weeks.push({ start: weekStart, end: weekEnd, label });
  }

  const options = weeks.map(week => ({
    value: week.start,
    label: week.label
  }))

  return (
    <div className="flex gap-4 items-center">
      <Select
      id="week-picker"
      instanceId="week-picker"
      defaultValue = {options[2]}
      options={options}
      onChange={selectedOption => {
        onWeekChange(selectedOption.value);
      }}
    />
    </div>
  );
}
