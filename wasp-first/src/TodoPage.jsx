import { getTasks, useQuery } from "wasp/client/operations";

export const TodoPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  return (
    <div>
      {tasks && <TaskList tasks={tasks} />}
      {isLoading && "...Loading"}
      {error && "Error" + error}
    </div>
  );
};

const taskView = ({ task }) => {
  return (
    <div>
      <input type='checkbox' id={String(task.id)} checked={task.isDOne} />
      {task.description}
    </div>
  );
};

const TaskList = ({ tasks }) => {
  if (!tasks?.length) return <div>No tasks</div>;
  return (
    <div>
      {tasks.map(task, (idx) => {
        <taskView task={task} key={idx} />;
      })}
    </div>
  );
};
