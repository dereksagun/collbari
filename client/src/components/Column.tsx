import type { ColumnDetailed } from "../types";
import TaskCard from "./TaskCard";
import { useModal } from "./Context/ModalContext";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCardDraggable from "./TaskCardDraggable";
import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";



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
      <Card className="column flex flex-col gap-y-3 p-5 w-[300px]" sx={{ overflowY: 'auto' }} ref={setNodeRef}>
        <Typography variant="h6">{column.name}</Typography>
          <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
            {column.tasks.map(task => (
              <TaskCardDraggable key={task.id} task={task} boardId={boardId} column={column}>
                <TaskCard />
              </TaskCardDraggable>
            ))}
          </SortableContext>
        <Button onClick={handleAddTask} variant="text" sx={{ textAlign: 'left', justifyContent: 'flex-start'}}>+ Add</Button>
      </Card>
    </div>
  )
}

export default ColumnGrid