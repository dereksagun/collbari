import './App.css'
import './ui/AddTask.css'
import { Status, type Column, type ColumnDetailed, type NewTask, type Task } from './types'
import { TaskForm } from './components/TaskForm'
import { AddTaskModalProvider, useAddTaskModal } from './components/TaskModal'
import { useTasks } from './features/tasks/hooks'
import { useColumns } from './features/columns/hooks'
import ColumnGrid from './components/Column'
import { ModalProvider, useModal } from './components/Modal'
import ListForm from './components/ListForm'
import { CSS } from "@dnd-kit/utilities";

const ColumnAddList = () => {

  const { openModal } = useModal();

  const onClick = () => {
    openModal({type: "ADD_COLUMN"});
  }

  return (
    <div>
        <button className="list-container add-list-button" onClick={onClick}>+ Add another list</button>
    </div>
    
  )
}

const Modal = () => {
  const { modal } = useModal();
  switch (modal.type) {
    case "ADD_TASK":
      return <TaskForm column={modal.props.column}/>
    case "ADD_COLUMN":
      return <ListForm />
  }
}

const Header = () => {
  return (
    <div className='board-header'>Kanban Board</div>
  )
}
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'

const Item = ({num} : {num: number}) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: num,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <button className='task-card' style={style} ref={setNodeRef} {...listeners} {...attributes}>{num}</button>
  )
}
const Items = () => {
  const items: number[] = [1 , 2, 3];
  const {setNodeRef} = useDroppable({
    id: 'test'
  })

  return (
    <div className='column flex flex-col gap-y-3 p-5 w-[300px]' ref={setNodeRef}>
      {items.map(i => <Item key={i} num={i}/>)}
    </div>
  )
}

const Droppable = () => {
  const {setNodeRef} = useDroppable({
    id: 'test2'
  })

  return (
    <div className='column flex flex-col gap-y-3 p-5 w-[300px]' ref={setNodeRef}>
      
    </div>
  )
}

function App() {

  const { 
    data: columns, 
    isPending: columnsIsPending, 
    isError: columnsIsError, 
    error: columnsError
     } = useColumns();

  const { 
    data: tasks, 
    isPending: tasksIsPending, 
    isError: tasksIsError, 
    error: tasksError
     } = useTasks();

  if (columnsIsPending || tasksIsPending ) return <span>Loading...</span>;
  if (columnsIsError || tasksIsError) {
    return <span>Error! {tasksError?.message} {columnsError?.message}</span>
  }
  
  const board: ColumnDetailed[] = columns.map(col => {
    const tasksDetails: Task[] = col.taskIds.map(id => tasks.find(t => t.id === id)).filter(t => t != undefined);
    return({ ...col, tasks: tasksDetails })
  })
  
  return (
    <div>
      <Header />
      <ModalProvider>
        <div>
          <div className="flex gap-3 p-2">
            {board.map(col => <ColumnGrid key={col.id} column={col}/>)}
            <ColumnAddList />
          </div>
          <Modal />
        </div>
      </ModalProvider>
      <DndContext>
        <Items />
        <Droppable />
      </DndContext>
      
    </div>
  )
  
}

export default App
