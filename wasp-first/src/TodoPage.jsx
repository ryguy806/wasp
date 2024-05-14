import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  useQuery,
} from "wasp/client/operations";
import { logout } from "wasp/client/auth";
import { useState } from "react";

export const TodoPage = ({ user }) => {
  console.log(user);
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <NewTaskForm />

      {tasks && <TaskList tasks={tasks} />}

      <div className='Button'>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

const TaskView = ({ task }) => {
  const handleIsDoneChange = async (event) => {
    try {
      await updateTask({
        id: task.id,
        isDone: event.target.checked,
      });
    } catch (error) {
      window.alert("Error while udating task: " + error.message);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteTask({ id: task.id });
    } catch (error) {
      window.alert("Error while deleting task: " + error.message);
    }
  };

  return (
    <div>
      <input
        type='checkbox'
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleIsDoneChange}
      />
      {task.description}
      {!task.isDone ? (
        <></>
      ) : (
        <>
          <button style={{ marginLeft: "20px" }} onClick={handleDeleteTodo}>
            Delete?
          </button>
        </>
      )}
    </div>
  );
};

const TaskList = ({ tasks }) => {
  if (!tasks?.length) return <div>No tasks</div>;
  return (
    <div>
      {tasks.map((task, idx) => {
        return <TaskView task={task} key={idx} />;
      })}
    </div>
  );
};

const NewTaskForm = () => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const target = event.target;
      const description = target.description.value;
      target.reset();
      await createTask({ description });
    } catch (error) {
      window.alert("Error" + error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type='text' name='description' defaultValue='' />
      <input type='submit' value='Create Task' />
    </form>
  );
};
