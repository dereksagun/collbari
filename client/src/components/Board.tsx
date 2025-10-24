import { DndContext, closestCenter, DragOverlay, type DragEndEvent, type DragOverEvent, type DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import ColumnGrid from "./Column"
import { ModalProvider, useModal } from './Context/ModalContext'
import TaskCard from "./TaskCard"
import { arrayMove } from "@dnd-kit/sortable"
import type { BoardDetailed, Column, Task } from "../types"
import { useContext, useEffect, useState } from "react"
import { useColumns } from "../hooks/useColumns"
import { useTasks } from "../hooks/useTasks"
import ListForm from "./Forms/ListForm"
import { TaskForm } from "./Forms/TaskForm"
import { connectSocket, disconnectSocket, joinRoom, leaveRoom } from "../services/socket"
import { useBoards } from "../hooks/useBoards"
import type { Board } from "../types"
import ShareWithForm from "./Forms/ShareWithForm"
import BoardTabs from "./BoardTabs"
import AddColumnButton from "./Inputs/AddColumnButton"
import NewBoardForm from "./Forms/NewBoardForm"
import { UserContext } from "./Context/UserContext"
import ShareUsersColumn from "./SharedUsersColumn"
import WelcomePage from "./WelcomePage"


const Modal = () => {
  const { modal } = useModal();
  switch (modal.type) {
    case "ADD_TASK":
      return <TaskForm column={modal.props.column} boardId={modal.props.boardId}/>
    case "ADD_COLUMN":
      return <ListForm board={modal.props.board}/>
    case "SHARE_BOARD":
      return <ShareWithForm board={modal.props.board}/>  
    case "ADD_BOARD":
      return <NewBoardForm />
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

const KanbanBoard = () => {

  const sensors = useSensors(useSensor(PointerSensor));
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const user = useContext(UserContext);

  const {
    data: boards,
    isPending: boardsIsPending,
    isError: boardsIsError,
    error: _boardsError,
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
    refetchTasks,
    updateTaskInCache,
    deleteTaskInCache
      } = useTasks();
  useEffect(() => {
    if(!activeBoard?.id) return;
  
    connectSocket({
      onAddTask: insertTaskIntoCache,
      onAddColumn: insertNewColumnIntoCache,
      onUpdateColumn: updateColumnInCache,
      onUpdateTask: updateTaskInCache,
      onDeleteTask: deleteTaskInCache
    });
    joinRoom(activeBoard.id);

    return () => {
      disconnectSocket({
        onAddTask: insertTaskIntoCache,
        onAddColumn: insertNewColumnIntoCache,
        onUpdateColumn: updateColumnInCache,
        onUpdateTask: updateTaskInCache,
        onDeleteTask: deleteTaskInCache
      });

      leaveRoom(activeBoard.id);
    }
  },[activeBoard])
  
  useEffect (() => {
    if(!boards || !user) return;

    if(!activeBoard){
      setActiveBoard(boards[0]);
    } else {
      setActiveBoard(boards.find(b => b.id === activeBoard.id) || null)
    }
  }, [boards, user])

  if (columnsIsPending || tasksIsPending || boardsIsPending ) return <span>Loading...</span>;
  if (columnsIsError || tasksIsError || boardsIsError) {
    return <span>Error! {tasksError?.message} {columnsError?.message}</span>
  }

  const board = fillBoardDetails(activeBoard, columns, tasks);
  //console.log('board', board);
  

  const findContainer = (id: string | null): String | null => {
    if(!id) return null;

    const column = columns.find(col => col.id === id)?.id //id is a column id

    if(column) return column; //new list

    const columnId = columns.find(col => col.taskIds.includes(id))?.id; //id is a taskId so we return the colId
    return columnId ? columnId : null;

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

    updateColumn.mutate({column: updatedFromCol, boardId: board?.id || ''});
    updateColumn.mutate({column: updatedToCol, boardId: board?.id || ''});


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

      const updatedColumn: Column = {
        ...column,
        taskIds: updateTaskIds
      };
      updateColumn.mutate({column: updatedColumn, boardId: board?.id || ''});
      
    }
    setActiveTask(null);
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    if (task) setActiveTask(task);
  }

  const dropAnimation = {
    duration: 500,
    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
  }

  const handleBoardChange = async (_event: React.SyntheticEvent, board: Board) => {
    refetchTasks();
    refetchColumns();
    refetchBoards();
    const newActive = boards?.find(b => b.id === board.id) || null
    setActiveBoard(newActive)
  }
  return (
    <ModalProvider>
    {!activeBoard 
      ? 
      <WelcomePage /> 
      : 
      <div className="kanban-background">
      <div className="kanban-tab-header">
        <BoardTabs activeBoard={activeBoard} boards={boards} handleBoardChange={handleBoardChange}></BoardTabs> 
      </div>
      <div style={{display: 'flex', flex: 1, height: '100%'}}>
        <ShareUsersColumn board={activeBoard}/>
      <div className="kanban-board">
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={closestCenter} sensors={sensors}>
          <div style={{height: '100%'}}>
            {activeBoard 
              ?
                <>
                  <div className="flex gap-[24px] p-5 h-full">
                    {board?.columns?.map(col => <ColumnGrid key={col.id} column={col} boardId={board.id}/>)}
                    {activeBoard ? <AddColumnButton board={activeBoard}/> : null}
                  </div>
                </>
              :
                null
            }
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask ? (
              <TaskCard ><input type="checkbox" checked={activeTask.completed} className="checkbox checkbox-xs" />{activeTask.title}</TaskCard>
            ) : null}
          </DragOverlay>
      </DndContext>
      </div>
      </div>
      
    </div>
    }
    <Modal />
    </ModalProvider>
    
  )
  
}

export default KanbanBoard