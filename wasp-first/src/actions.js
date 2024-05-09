export const createTask = async (args, context) => {
  return context.entities.Task.create({
    data: {
      description: args.description,
    },
  });
};

export const updateTask = async ({ id, isDone }, context) => {
  return context.entities.Task.update({
    where: { id },
    data: {
      isDone: isDone,
    },
  });
};

export const deleteTask = async ({ id }, context) => {
  return context.entities.Task.delete({
    where: { id },
  });
};
