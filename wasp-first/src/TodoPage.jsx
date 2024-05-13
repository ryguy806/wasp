import { Tasks } from "wasp/client/crud";
import { logout } from "wasp/client/auth";
import { useState } from "react";

export const TodoPage = () => {
  const { data: tasks, isLoading, error } = Tasks.getAll.useQuery();
  const createTask = Tasks.create.useAction();
  const [taskDescription, setTaskDescription] = useState("");

  const handleCreateTask = () => {
    createTask({ description: taskDescription, isDone: false });
    setTaskDescription("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        fontSize: "1.5rem",
        display: "grid",
        placeContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <input
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskView task={task} />
          </li>
        ))}
      </ul>

      <div className='Button'>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

const TaskView = ({ task }) => {
  const updateTask = Tasks.update.useAction();
  const [todo, setTodo] = useState(task.isDone);

  const handleIsDoneChange = async (event) => {
    try {
      updateTask({ id: task.id, isDone: event.target.checked });
    } catch (error) {
      window.alert("Error while updating task:" + error.message);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteTask({ id: task.id });
    } catch (error) {
      window.alert("Error while deleting task:" + error.message);
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
        <button onClick={handleDeleteTodo}>Delete?</button>
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
