import {
  getTasks,
  useQuery,
  createTask,
  updateTask,
  deleteTask,
} from "wasp/client/operations";
import { logout } from "wasp/client/auth";

export const TodoPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  return (
    <div>
      <NewTaskForm />
      {tasks && <TaskList tasks={tasks} />}
      {isLoading && "...Loading"}
      {error && "Error" + error}
      <br />
      <br />
      Logout does not work. It's still being developed. Please note that Wasp is
      still in Beta at this time.
      <div className='Button'>
        <button onCLick={logout}>Logout</button>
      </div>
    </div>
  );
};

const TaskView = ({ task }) => {
  const handleIsDoneChange = async (event) => {
    try {
      await updateTask({ id: task.id, isDone: event.target.checked });
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
