import { HttpError } from "wasp/server";

export const createTask = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, "Not today Satan!");
  }

  const { description } = args;
  const { Task } = context.entities;

  return await Task.create({
    data: {
      description: description,
      user: { connect: { id: context.user.id } },
    },
  });
};

export const updateTask = async ({ id, isDone }, context) => {
  if (!context.user) {
    throw new HttpError(401, "Not today Satan!");
  }

  return Task.updateMany({
    where: { id: id, user: { id: user.id } },
    data: {
      user: { connect: { id: context.user.id } },
      isDone: isDone,
    },
  });
};

export const deleteTask = async ({ id }, context) => {
  return context.entities.Task.delete({
    where: { id },
  });
};
