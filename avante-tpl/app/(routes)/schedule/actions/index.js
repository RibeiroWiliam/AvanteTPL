import {
  createAssignments,
  deleteAssignments,
  updateAssignments,
} from "./requests";

export const saveSchedule = async (assignments) => {
  const newAssignments = assignments.filter(
    (assignment) => assignment.addLocally && assignment.publishers.length > 0
  );
  const modifiedAssignments = assignments.filter(
    (assignment) => assignment.modifiedLocally && assignment.publishers.length > 0
  );
  const deletedAssignments = assignments.filter(
    (assignment) => assignment.modifiedLocally && assignment.publishers.length === 0
  );
  const response = {
    createdAssignments: 0,
    modifiedAssignments: 0,
    deletedAssignments: 0,
    errors: [],
  };

  if (newAssignments.length > 0) {
    const { createdAssignments, errors } = await createAssignments(newAssignments);
    response.createdAssignments += createdAssignments.length;
    response.errors.push(...errors);
  }
  if (modifiedAssignments.length > 0) {
    const { updatedAssignments, errors } =
      await updateAssignments(modifiedAssignments);
    response.updatedAssignments += updatedAssignments.length;
    response.errors.push(...errors);
  }
  if (deletedAssignments.length > 0) {
    const deleted = await deleteAssignments(deletedAssignments);
    response.deletedAssignments += deleted.length;
  }

  return response;
};
