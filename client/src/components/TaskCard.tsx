import { SortableContext, useSortable } from "@dnd-kit/sortable"
import type { Task } from "../types"
import {CSS} from '@dnd-kit/utilities';
import { useState } from "react";


interface taskBoxProp {
  task: Task
}

const TaskCard = ({task}: taskBoxProp) => {
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
    <div className='task-card' ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h5>{task.title}</h5>
    </div>
  )
}

export default TaskCard