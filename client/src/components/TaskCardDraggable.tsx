import { useSortable } from "@dnd-kit/sortable"
import {CSS} from '@dnd-kit/utilities';
import type { Task } from "../types";
import TaskCard from "./TaskCard";
import type React from "react";

const TaskCardDraggable = ({task, children}: {task: Task, children: React.ReactNode}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task.id,
      transition: {
        duration: 150, // milliseconds
        easing: 'cubic-bezier(0.29, 1.01, 1, -0.68)'
      }
    })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskCard style={style}  {...attributes} {...listeners} ref={setNodeRef}>
      {task.title}
    </TaskCard>
    
  );
}

export default TaskCardDraggable