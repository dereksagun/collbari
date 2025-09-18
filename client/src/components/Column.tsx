import type { ColumnDetailed } from "../types";
import TaskCard from "./TaskCard";
import { useModal } from "./Modal";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskContainer from "./TaskCardDraggable";


interface columnProp {
  column: ColumnDetailed
}

const ColumnGrid = ({column} : columnProp) => {

  const { openModal } = useModal();
  const { setNodeRef } = useDroppable({
    id: column.id
  });

  const handleClick = () => {
    openModal({ type: 'ADD_TASK', props: { column: column } });
  }
  
  const tasksIds = column.tasks.map(t => t.id);

  return (
    <div >
      <div className="column flex flex-col gap-y-3 p-5 w-[300px]" ref={setNodeRef}>
        {column.name}
          <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
            {column.tasks.map(task => (
              <TaskContainer key={task.id} task={task}>
                <TaskCard />
              </TaskContainer>
            ))}
          </SortableContext>
        <button onClick={handleClick} className="add-task-button">+ Add another</button>
      </div>
    </div>
  )
}

export default ColumnGrid