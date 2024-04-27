import { shifts } from "@/app/constants/shifts";
import { Modal } from "@/app/components/Modal";
import { weekdays } from "@/app/constants/weekdays";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getShiftDate } from "@/app/utils/getShiftDate";
import { useState } from "react";

const compareDayAndTime = (date1, date2) => (
  date1.getDay() === date2.getDay() && date1.getHours() === date2.getHours()
)

export default function AvailabilityMenu({ availabilities, closeMenu, saveChanges }) {
  const animatedComponents = makeAnimated();
  const options = shifts.map((shift) => ({
    value: shift,
    label: shift.label,
  }));
  const getDefaultValue = (day) => {
    const activeAvailabilities = [];
    options.forEach((option) => {
      const optionDate = getShiftDate(new Date(day.data), option.value);
      const foundAvailability = availabilities.find((availability) =>
        compareDayAndTime(new Date(availability.startTime), optionDate)
      );
      if (foundAvailability) activeAvailabilities.push(option);
    });
    return activeAvailabilities;
  };

  const [menuAvailabilities, setMenuAvailabilities] = useState(availabilities)

  const updateAvailabilities = (options, day) => {
    const date = new Date(day.data)
    const newShifts = options.filter(option => {
      const shiftDate = getShiftDate(date, option.value)
      const foundShift = menuAvailabilities.find(availability => compareDayAndTime(new Date(availability.startTime), shiftDate))
      return !foundShift
    })
    const newAvailabilities = newShifts.map(shift => {
      const startTime = getShiftDate(date, shift.value)
      const endTime = getShiftDate(date, shift.value, "endTime")

      return {
        id: menuAvailabilities[menuAvailabilities.length - 1].id + 1,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      }
    })
    const deletedAvailabilities = menuAvailabilities.filter(availability => {
      const availabilityDate = new Date(availability.startTime)
      const foundAvailability =  options.find(option => {
        const shift = option.value
        return compareDayAndTime(availabilityDate, getShiftDate(date, shift))
      })
      return !foundAvailability
    })
    console.log(deletedAvailabilities)
  }

  return (
    <Modal.Root width="w-3/4">
      <Modal.Toggler closeMenu={closeMenu} />
      <Modal.Title>Disponibilidades</Modal.Title>
      <div className="grid grid-cols-2 gap-4">
        {weekdays &&
          weekdays.map((day, index) => (
            <div key={index}>
              <label htmlFor={"period-picker" + index}>{day.label}</label>
              <Select
                id={"period-picker" + index}
                instanceId={"period-picker" + index}
                components={animatedComponents}
                options={options}
                defaultValue={getDefaultValue(day)}
                isMulti
                closeMenuOnSelect={false}
                onChange={options => updateAvailabilities(options, day)}
              />
            </div>
          ))}
      </div>
      <div className="flex justify-end gap-4 items-center mt-4">
        <Modal.Button variant="outline" onClick={closeMenu}>Cancelar</Modal.Button>
        <Modal.Button onClick={saveChanges}>Salvar</Modal.Button>
      </div>
    </Modal.Root>
  );
}
