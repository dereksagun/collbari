import { DndContext, closestCenter, DragOverlay, type DragEndEvent, type DragOverEvent, type DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import ColumnGrid from "./Column"
import { ModalProvider, useModal } from '../components/Modal'
import TaskCard from "./TaskCard"
import { arrayMove } from "@dnd-kit/sortable"
import type { BoardDetailed, Column, ColumnDetailed, loginPayload, NewBoard, Task, User, UserNonSensitive } from "../types"
import { useEffect, useState } from "react"
import { useColumns } from "../hooks/useColumns"
import { useTasks } from "../hooks/useTasks"
import ListForm from "./ListForm"
import { TaskForm } from "./TaskForm"
import { socket } from "../services/socket"
import { useBoards } from "../hooks/useBoards"
import type { Board } from "../types"
import { useQueryClient } from "@tanstack/react-query"

const ColumnAddList = ({board} : {board: Board}) => {
  const { openModal } = useModal();

  const onClick = () => {
    openModal({type: "ADD_COLUMN", props: {board}});
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
      return <TaskForm column={modal.props.column} boardId={modal.props.boardId}/>
    case "ADD_COLUMN":
      return <ListForm board={modal.props.board}/>
  }
}
const fillBoardDetails = (activeBoard: Board | null, columns: Column[] | undefined, tasks: Task[] | undefined): BoardDetailed | null => {

  if(!activeBoard) return null;
  const board: BoardDetailed = {
    ...activeBoard,
    columns: activeBoard.columnIds.map(colId => columns?.find(col => col.id === colId)).filter(c => c != undefined)
        .map(col => {
          return {
            ...col,
            tasks: col.taskIds.map(id => tasks?.find(t => t.id === id)).filter(t => t != undefined)
          }
        })
  }
  return board;
}

const KanbanBoard = ({user}: {user:UserNonSensitive}) => {

    const sensors = useSensors(useSensor(PointerSensor));
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [activeBoard, setActiveBoard] = useState<Board | null>(null);
    const queryClient = useQueryClient();

    const {
      data: boards,
      isPending: boardsIsPending,
      isError: boardsIsError,
      error: boardsError,
      createBoard,
      updateBoard,
      refetchBoards
    } = useBoards();
    
    const { 
      data: columns, 
      isPending: columnsIsPending, 
      isError: columnsIsError, 
      error: columnsError,
      updateColumn,
      insertNewColumnIntoCache,
      updateColumnInCache,
      refetchColumns
       } = useColumns();
  
    const { 
      data: tasks, 
      isPending: tasksIsPending, 
      isError: tasksIsError, 
      error: tasksError,
      insertTaskIntoCache,
      refetchTasks
       } = useTasks();
       
    
    useEffect (() => {
      socket.emit('leaveRoom');

      if(!activeBoard){
        setActiveBoard(boards?.[0] ?? null);
      }else if(activeBoard){
        setActiveBoard(boards?.find(b => b.id === activeBoard.id) ?? null);
          /**
           * issue: activeBoard is not getting the updated Column Ids but boards is
           * boards is set from the query
           * active board is set in this use effect or through button click
           *  -> if boards changes then we need to update the activeBoard
           */
      }
    }, [user, boards, activeBoard])
    console.log('boards', boards)
    let joined = false;

    useEffect(() => {
      

      if (!joined && activeBoard) {
        socket.emit("joinRoom", activeBoard?.id);
        joined = true;
      }
      socket.on("add:task", insertTaskIntoCache);
      socket.on("add:column", insertNewColumnIntoCache);
      socket.on("update:column", updateColumnInCache);

      return () => {
        socket.off("add:task", insertTaskIntoCache);
        socket.off("add:column", insertNewColumnIntoCache);
        socket.off("update:column", updateColumnInCache);

        socket.emit('leaveRoom', activeBoard?.id);
      }

    },[activeBoard])

    if (columnsIsPending || tasksIsPending || boardsIsPending ) return <span>Loading...</span>;
    if (columnsIsError || tasksIsError || boardsIsError) {
      return <span>Error! {tasksError?.message} {columnsError?.message}</span>
    }

    const board = fillBoardDetails(activeBoard, columns, tasks);
    if(!board || !activeBoard) return null

    const findContainer = (id: string | null): String | null => {
      if(!id) return null;
  
      const column = columns.find(col => col.id === id)?.id //id is a column id
  
      if(column) return column; //new list
  
      const columnId = columns.find(col => col.taskIds.includes(id))?.id; //id is a taskId so we return the colId
  
      return columnId ? columnId : null;
  
    }
    
    const handleBoardUpdated = () => {
      refetchColumns();
      refetchTasks();
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
  
      const index = 
        over === toCol.id 
        ? toCol.taskIds.length 
        : toCol.taskIds.findIndex(tid => tid === over)
  
      toCol.taskIds.splice(index, 0, active);
  
      const updatedToCol = {
        ...toCol,
        taskIds: toCol.taskIds
      }    
  
      updateColumn.mutate({column: updatedFromCol, boardId: board.id});
      updateColumn.mutate({column: updatedToCol, boardId: board.id});
  
  
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
        updateColumn.mutate({column: updatedColumn, boardId: board.id});
        
      }
      console.log('end draggin');
      setActiveTask(null);
    }
  
    const handleDragStart = (event: DragStartEvent) => {
      console.log('started draggin');
      const task = tasks.find(t => t.id === event.active.id)
      if (task) setActiveTask(task);
    }
  
    const dropAnimation = {
      duration: 500,
      easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
    }

  const handleAddBoard = () => {
    console.log('createNew');
    const newBoard: NewBoard = {
      columnIds: [],
      owner: user.id,
      sharedWith: []
    }
    createBoard.mutate(newBoard)
  }

  const handleBoardChange = (board: Board) => {
    setActiveBoard(board);
    refetchBoards();
    refetchColumns();
    refetchTasks();
  }

  return (
    <>
    <div className="flex space-x-2 border-b border-gray-300">
      {boards.map((board) => (
        <button
          key={board.id}
          onClick={() => handleBoardChange(board)}
          className={`px-4 py-2 rounded-t-md ${
            activeBoard?.id === board.id
              ? "bg-white border border-b-0 border-gray-300 font-semibold"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {board.id}
        </button>
      ))}
      <button
        onClick={handleAddBoard}>
        +
        </button>
</div>
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={closestCenter} sensors={sensors}>
        <ModalProvider>
          <div>
            <div className="flex gap-3 p-2">
              {board?.columns?.map(col => <ColumnGrid key={col.id} column={col} boardId={board.id}/>)}
              <ColumnAddList board={activeBoard}/>
            </div>
            <Modal />
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask ? (
              <TaskCard>{activeTask.title}</TaskCard>
            ) : null}
          </DragOverlay>
        </ModalProvider>
      </DndContext>
    </>
    
  )
  
}

export default KanbanBoard