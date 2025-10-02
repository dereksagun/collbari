
import { useRef, useState } from "react";
import type { Column, Status, NewTask} from "../types";
import { useTasks } from "../hooks/useTasks";
import { useModal } from "./Modal";

export const TaskForm = ({column, boardId}: {boardId: string, column: Column}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>('not started')

  const { createTask } = useTasks();

  const { closeModal } = useModal();

  const addTask = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newTask: NewTask = { title, description, status }
    createTask.mutate({column, task:newTask, boardId});
    setTitle('');
    setDescription('');
    closeModal();

  }
  const taskFormRef = useRef<HTMLDialogElement | null>(null);

  return(
      <div className='add-task-form modal'>
      <form onSubmit={addTask}>
        <div className="inputLabel">Add Task</div>
        <div className='input-group'>
          <span className='inputLabel'>Title</span>
          <input 
            className='input-textbox' 
            type='text'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}/>
          <br />
        </div>
        <div className='input-group'>
          <span className='inputLabel'>Description</span>
          <textarea 
            className='input-textbox input-textarea'
            id='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}/>
          <br />
        </div>
        <span><button onClick={closeModal} className="declineButton" type="button">Cancel</button> <button className="acceptButton" type="submit">Submit</button></span>
      </form>
    </div>
    
    
  )
}