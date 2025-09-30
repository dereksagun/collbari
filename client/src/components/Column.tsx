import type { Column, ColumnDetailed } from "../types";
import TaskCard from "./TaskCard";
import { useModal } from "./Modal";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCardDraggable from "./TaskCardDraggable";


interface columnProp {
  column: ColumnDetailed
}

const ColumnGrid = ({boardId, column}: {boardId: string, column: ColumnDetailed}) => {

  const { openModal } = useModal();
  const { setNodeRef } = useDroppable({
    id: column.id
  });

  const handleAddTask = () => {
    openModal({ type: 'ADD_TASK', props: { column: column, boardId: boardId} });
  }
  
  const tasksIds = column.tasks.map(t => t.id);

  return (
    <div >
      <div className="column flex flex-col gap-y-3 p-5 w-[300px]" ref={setNodeRef}>
        {column.name}
          <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
            {column.tasks.map(task => (
              <TaskCardDraggable key={task.id} task={task}>
                <TaskCard />
              </TaskCardDraggable>
            ))}
          </SortableContext>
        <button onClick={handleAddTask} className="add-task-button">+ Add another</button>
      </div>
    </div>
  )
}

export default ColumnGrid