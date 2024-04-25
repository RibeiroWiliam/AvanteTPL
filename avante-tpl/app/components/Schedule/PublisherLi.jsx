import getDay from "@/app/utils/getDay"
import { useState } from "react"

export default function PublisherLi({publisher}) {
  const {name, assignments} = publisher
  const [open, setOpen] = useState(false)

  const getTextColor = () => {
    const textColors = {
      "good": "text-gray-400",
      "alert": "text-yellow-400",
      "danger": "text-red-400"
    }
    if(assignments.length < 3) return textColors.good
    else if(assignments.length < 4) return textColors.alert
    else if(assignments.length < 5) return textColors.danger
  }
  
  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
      <span>{name}</span>
      <span className={`${getTextColor()} text-sm font-bold text-gray-400`}>
        {assignments.length}x
      </span>
      <button onClick={() => setOpen(prevOpen => !prevOpen)} className={`${open ? "" : "text-gray-400"}`}>
        {open ? (<i className="bi bi-caret-up-fill"></i>) : (<i className="bi bi-caret-down-fill"></i>)}
      </button>
      </div>  
      {open && (
        <ul className="list-disc ml-4">
          {assignments.map(assignment => {
            const startTime = new Date(assignment.startTime)
            const endTime = new Date(assignment.endTime)
            return(
              <li>{getDay(startTime)} - {startTime.getHours()} as {endTime.getHours()}</li>
            )         
          })}
        </ul>
      )}
    </li>
  );
}
