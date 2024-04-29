import { shifts } from "@/app/constants/shifts";
import { Modal } from "@/app/components/Modal";
import { weekdays } from "@/app/constants/weekdays";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getShiftDate } from "@/app/utils/getShiftDate";
import { useState } from "react";
import getDay from "@/app/utils/getDay";

const compareDayAndTime = (date1, date2) => (
  date1.getDay() === date2.getDay() && date1.getHours() === date2.getHours()
)

export default function AvailabilityMenu({ publisherId, availabilities, closeMenu, saveChanges }) {
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
    const date = new Date(day.data);
  
    const newAvailabilities = [];
    const deletedIds = new Set();
  
    for (const option of options) {
      const shiftDate = getShiftDate(date, option.value);
      const foundShift = menuAvailabilities.find((availability) =>
        compareDayAndTime(new Date(availability.startTime), shiftDate)
      );
      if(foundShift && foundShift.deletedLocally){
        const index = menuAvailabilities.findIndex(availability => availability.id === foundShift.id)
        menuAvailabilities[index].deletedLocally = false
      }
      else if (!foundShift) {
        const id = menuAvailabilities.length > 0 ? menuAvailabilities[menuAvailabilities.length - 1].id + 1 : 1;
        const startTime = getShiftDate(date, option.value).toISOString();
        const endTime = getShiftDate(date, option.value, "endTime").toISOString();
        newAvailabilities.push({
          id,
          publisherId,
          startTime,
          endTime,
          addLocally: true,
        });
      }
    }
  
    for (const availability of menuAvailabilities) {
      const foundAvailability = options.find(option => compareDayAndTime(getShiftDate(date, option.value), new Date(availability.startTime)));
      if (!foundAvailability && getDay(availability.startTime) === getDay(date)) {
        deletedIds.add(availability.id);
      }
    }
  
    const updatedAvailabilities = menuAvailabilities.filter(availability => !deletedIds.has(availability.id));

    const deletedAvailabilities = menuAvailabilities.filter(availability => deletedIds.has(availability.id) && !availability.addLocally).map(availability => {
      const {id, startTime, endTime } = availability
      return {
        id,
        startTime,
        endTime,
        deletedLocally: true
      }
    });
  
    setMenuAvailabilities([...updatedAvailabilities, ...newAvailabilities, ...deletedAvailabilities]);
  };

  console.log(menuAvailabilities)

  return (
    <Modal.Root width="w-3/4">
      <Modal.Toggler closeMenu={closeMenu} />
      <Modal.Title>Editar Disponibilidades</Modal.Title>
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
        <Modal.Button onClick={() => saveChanges(menuAvailabilities)}>Salvar</Modal.Button>
      </div>
    </Modal.Root>
  );
}
