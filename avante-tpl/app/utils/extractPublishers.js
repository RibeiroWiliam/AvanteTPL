const filterAssignmentsByPublisher = (publisherId, assignments) =>
  assignments.filter((assignment) =>
    assignment.publishers.find((publisher) => publisher.id === publisherId)
  );

export const extractPublishers = (assignments, publishers) => {
  return publishers && publishers.map(publisher => {
    const { id, name, pioneer } = publisher;
    return {
      id,
      name,
      pioneer,
      assignments: filterAssignmentsByPublisher(id, assignments),
    };
  });
};
