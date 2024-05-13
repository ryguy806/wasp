import { HttpError } from "wasp/server";

export const createTask = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, "Not today Satan!");
  }
  return context.entities.Task.create({
    data: {
      description: args.description,
      user: { connect: { id: context.user.id } },
    },
  });
};

export const updateTask = async ({ id, isDone }, context) => {
  if (!context.user) {
    throw new HttpError(401, "Not today Satan!");
  }
  return context.entities.Task.updateMany({
    where: { id: args.id, user: { id: context.user.id } },
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
