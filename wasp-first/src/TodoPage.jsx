import { getTasks, useQuery, createTask } from "wasp/client/operations";

export const TodoPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  return (
    <div>
      <NewTaskForm />

      {tasks && <TaskList tasks={tasks} />}

      {isLoading && "...Loading"}
      {error && "Error" + error}
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
  return (
    <div>
      <input
        type='checkbox'
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleIsDoneChange}
      />
      {task.description}
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
      const description = target.descriptionvalue;
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
