export const getShiftDate = (day, shift, time="startTime") =>
  new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    shift[time].split(":")[0],
    shift[time].split(":")[1]
  );