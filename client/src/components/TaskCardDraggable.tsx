import { useSortable } from "@dnd-kit/sortable"
import {CSS} from '@dnd-kit/utilities';
import type { Column, Task } from "../types";
import TaskCard from "./TaskCard";
import type React from "react";
import { useTasks } from "../hooks/useTasks";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useColumns } from "../hooks/useColumns";

const TaskCardDraggable = ({task, children, boardId, column}: {task: Task, children: React.ReactNode, boardId: string, column: Column}) => {
  const [display, setDisplay] = useState('none');

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task.id,
      transition: {
        duration: 150, // milliseconds
        easing: 'cubic-bezier(0.29, 1.01, 1, -0.68)'
      }
    })

  const { updateTask, deleteTask } = useTasks();
  const { updateColumn }= useColumns();

  const handleUpdateCompleted = (event: React.SyntheticEvent, boardId: string) => {
    event.preventDefault();
    const updatedTask: Task = {
      ...task,
      completed: !task.completed
    }
    updateTask.mutate({updatedTask, boardId});
  }
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseEnter = () => {
    setDisplay('block');
  }

  const handleMouseLeave = () => {
    setDisplay('none');
  }

  const handleDelete = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  }

  const handleDelete2 = () => {
    
    deleteTask.mutate({taskId: task.id, boardId});
    
    const idx = column.taskIds.findIndex(t => t === task.id)
    column.taskIds.splice(idx, 1);

    updateColumn.mutate({column, boardId});
  }

  return (
    <TaskCard style={style}  {...attributes} {...listeners} ref={setNodeRef}>
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{display: 'flex', gap: '6px', alignItems: 'center', width: '100%' }}>
        <input onChange={(event) => handleUpdateCompleted(event, boardId)} type="checkbox" checked={task.completed} className="checkbox checkbox-xs" onPointerDown={(e) => e.stopPropagation()} /> 
        <Box sx={{flex: 1, wordBreak: 'break-word'}}>{task.title}</Box>
        <IconButton onPointerDown={handleDelete} onClick={handleDelete2} size="small" sx={{justifyContent:'right' ,display:''}}><DeleteIcon sx={{height: '17px', width: '17px', display: display}}/></IconButton>
  
      </Box>
    </TaskCard>
    
  );
}

export default TaskCardDraggable