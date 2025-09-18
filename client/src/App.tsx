import './App.css'
import './ui/AddTask.css'
import { type Column, type ColumnDetailed, type Task } from './types'
import { TaskForm } from './components/TaskForm'
import { useTasks } from './features/tasks/hooks'
import { useColumns } from './features/columns/hooks'
import ColumnGrid from './components/Column'
import { ModalProvider, useModal } from './components/Modal'
import ListForm from './components/ListForm'
import { CSS } from "@dnd-kit/utilities";
import { closestCenter, DndContext, PointerSensor, useDraggable, useSensor, useSensors, type DragEndEvent, type DragOverEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

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

function App() {
  const sensors = useSensors(useSensor(PointerSensor));

  const { 
    data: columns, 
    isPending: columnsIsPending, 
    isError: columnsIsError, 
    error: columnsError,
    updateColumn
     } = useColumns();

  const { 
    data: tasks, 
    isPending: tasksIsPending, 
    isError: tasksIsError, 
    error: tasksError,
     } = useTasks();

  if (columnsIsPending || tasksIsPending ) return <span>Loading...</span>;
  if (columnsIsError || tasksIsError) {
    return <span>Error! {tasksError?.message} {columnsError?.message}</span>
  }
  
  const board: ColumnDetailed[] = columns.map(col => {
    const tasksDetails: Task[] = col.taskIds.map(id => tasks.find(t => t.id === id)).filter(t => t != undefined);
    return({ ...col, tasks: tasksDetails })
  })
  
  const findContainer = (id: string | null): String | null => {
    if(!id) return null;

    const column = columns.find(col => col.id === id)?.id //id is a column id

    if(column) return column; //new list

    const columnId = columns.find(col => col.taskIds.includes(id))?.id; //id is a taskId so we return the colId

    return columnId ? columnId : null;

    return null
  }
  
  const handleDragOver = (event: DragOverEvent) => {
    const active = String(event.active.id);
    const over = String(event.over?.id);
    
    const fromColId = findContainer(active)
    const toColId = findContainer(over); 

    if(!fromColId || !toColId || fromColId === toColId) return;

    const fromCol = columns.find(c => c.id === fromColId);
    const toCol = columns.find(c => c.id === toColId);
    if(!toCol || !fromCol) return;
    
    const updatedFromCol = {
      ...fromCol,
      taskIds: fromCol?.taskIds.filter(tid => tid != active)
    };

    console.log('dragging item  ', active);
    console.log('dragging to    ', over);

    console.log('starting column', fromColId);
    console.log('ending column  ', toColId);

    console.log(' _______________________________________');

    const index = 
      over === toCol.id 
      ? toCol.taskIds.length 
      : toCol.taskIds.findIndex(tid => tid === over)

    toCol.taskIds.splice(index, 0, active);

    const updatedToCol = {
      ...toCol,
      taskIds: toCol.taskIds
    }    

    updateColumn.mutate(updatedFromCol);
    updateColumn.mutate(updatedToCol);


  }

  const handleDragEnd = (event: DragEndEvent) => {
    const active = String(event.active.id);
    const over = String(event.over?.id);
    
    const fromColId = findContainer(active)
    const toColId = findContainer(over); 

    if(fromColId === toColId && active !== over){ 
      const column = columns.find(col => col.id === fromColId);
      if(!column) return;

      const fromIdxInTaskIds = column.taskIds.findIndex(taskId => taskId === active);
      const toIdxInTaskIds = column.taskIds.findIndex(taskId => taskId === over);
      if(fromIdxInTaskIds === -1   || toIdxInTaskIds === -1) return;
      
      const updateTaskIds = arrayMove(column.taskIds, fromIdxInTaskIds, toIdxInTaskIds)
      console.log(updateTaskIds);

      const updatedColumn: Column = {
        ...column,
        taskIds: updateTaskIds
      };

      updateColumn.mutate(updatedColumn);
    }
  }

  return (
    <div>
      <Header />
      <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}collisionDetection={closestCenter} sensors={sensors}>
        <ModalProvider>
          <div>
            <div className="flex gap-3 p-2">
              {board.map(col => <ColumnGrid key={col.id} column={col}/>)}
              <ColumnAddList />
            </div>
            <Modal />
          </div>
        </ModalProvider>
      </DndContext>
      
    </div>
  )
  
}

export default App
