
import { useState } from "react";
import type { Column, NewTask} from "../../types";
import { useTasks } from "../../hooks/useTasks";
import { useModal } from "../Context/ModalContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const TaskForm = ({column, boardId}: {boardId: string, column: Column}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { createTask } = useTasks();

  const { closeModal } = useModal();

  const addTask = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newTask: NewTask = { title, description, completed: false}
    createTask.mutate({column, task:newTask, boardId});
    setTitle('');
    setDescription('');
    closeModal();

  }

  return(
      <div className='modal shadow-xl border border-gray-100 w-[600px] p-6 space-y-5'>
      <form onSubmit={addTask}>
      <div className="text-lg font-semibold text-gray-800">Create New Task</div>
      <br></br>
      <TextField required fullWidth label="Title" value={title} onChange={(event) => setTitle(event.target.value)}/>
      <br></br>
      <br></br>
      <TextField required fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)}/>
      <br></br>
      <br></br>
      <span><Button onClick={closeModal} variant="outlined">Cancel</Button> <Button type="submit" variant="contained">Submit</Button></span>
      </form>
    </div>
    
    
  )
}