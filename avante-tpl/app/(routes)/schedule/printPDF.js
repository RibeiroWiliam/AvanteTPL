import { shifts } from "@/app/constants/shifts";
import getDay from "@/app/utils/getDay";
import getMonth from "@/app/utils/getMonth";
import { getShiftDate } from "@/app/utils/getShiftDate";
import getWeekDays from "@/app/utils/getWeekDays";

const colors = [
  { title: "text-blue-800", day: "bg-blue-800" },
  { title: "text-red-800", day: "bg-red-800" },
  { title: "text-purple-800", day: "bg-purple-800" },
];

// Função para encontrar os publishers de um determinado turno e equipamento
const findPublishers = (day, shift, equipmentId, assignments) => {
  const date = getShiftDate(day, shift);
  const foundAssignment = assignments?.find(
    (assignment) =>
      new Date(assignment.startTime).getTime() === date.getTime() &&
      assignment.equipmentId === equipmentId
  );
  return foundAssignment?.publishers.map(publisher => publisher.name) || [];
};

// Função para mapear os dados dos turnos para um determinado dia
const mapShiftsData = (day, equipmentId, assignments) =>
  shifts.map((shift) => ({
    period: shift.label,
    color: shift.color,
    publishers: findPublishers(day, shift, equipmentId, assignments),
  }));

// Função para mapear os dados dos dias para uma determinada semana
const mapDaysData = (equipmentId, activeWeek, assignments) =>
  getWeekDays(activeWeek).map((day) => ({
    text: `${getDay(day)} - ${day.getDate()} de ${getMonth(day)}`,
    shifts: mapShiftsData(day, equipmentId, assignments),
  }));

// Função principal para obter os dados para o PDF
export const getPDFData = (equipments, assignments, activeWeek) => {
  if (equipments && assignments) {
    return equipments.map((equipment) => ({
      title: `Programação TPL - ${equipment.name}`,
      color: colors[equipment.id - 1],
      days: mapDaysData(equipment.id, activeWeek, assignments),
    }));
  }
  return [];
};
