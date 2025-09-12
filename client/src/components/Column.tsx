import type { ColumnDetailed } from "../types";
import { useAddTaskModal } from "./TaskModal";
import TaskCard from "./TaskCard";
import { useModal } from "./Modal";

interface columnProp {
  column: ColumnDetailed
}

const ColumnGrid = ({column} : columnProp) => {
  const { openModal } = useModal();

  const onClick = () => {
    openModal({ type: 'ADD_TASK', props: { column: column } });
  }

  return (
    <div>
      <div className="column flex flex-col gap-y-3 p-5 w-[300px]">
        {column.name}
        {column.tasks.map(task => <TaskCard key={task.id} task={task}/>)}
        <button onClick={onClick} className="add-task-button">+ Add another</button>
      </div>
    </div>
  )
}

export default ColumnGrid