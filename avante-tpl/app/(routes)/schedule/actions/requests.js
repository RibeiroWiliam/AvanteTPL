import axios from "axios";

const formatArray = assignments =>
  assignments.map(assignment => {
    const { id, startTime, endTime, equipmentId, publishers } = assignment
    const publisherIds = publishers.map(publisher => publisher.id)
    return {
      id,
      startTime,
      endTime,
      equipmentId,
      publisherIds
    }
})

export const createAssignments = async assignments => {
  const formattedAssignments = formatArray(assignments)
  try {
    const response = await axios.post("/api/assignments", formattedAssignments);
    return response.data
  }
  catch(e){
    throw new Error("Erro desconhecido. Tente novamente mais tarde")
  }  
}

export const updateAssignments = async assignments => {
  const formattedAssignments = formatArray(assignments)
  try {
    const response = await axios.put("/api/assignments", formattedAssignments);
    return response.data
  }
  catch(e){
    throw new Error("Erro desconhecido. Tente novamente mais tarde")  
  }  
}

export const deleteAssignments = async assignments => {
  const assignmentIds = assignments.map(assignment => assignment.id)
  try {
    const response = await axios.delete("/api/assignments", {
      data: { assignmentIds }, // Passando os IDs no corpo da solicitação
    });
    return response.data
  }
  catch(e){
    throw new Error("Erro desconhecido. Tente novamente mais tarde") 
  }  
}

