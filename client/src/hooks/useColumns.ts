import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import columnService from '../api/columns';
import boardService from '../api/boards';

import type { Board, Column, NewColumn } from "../types";
import { socket } from "../services/socket";
import { queryKeys } from "./queryKeys";

export const useColumns = () => {
  const queryClient = useQueryClient();
  
  const queryColumns = useQuery<Column[]>({
    queryKey: [queryKeys.columns],
    queryFn: columnService.getAll
  })

  const createColumn = useMutation({
      mutationFn: async ({column, board}: {column: NewColumn, board: Board}) => {
        const addedColumn = await columnService.addColumn(column)
        const updatedBoard = await boardService.addColumnToBoard(addedColumn, board)
        return {addedColumn, updatedBoard}
      },
      onSuccess: async ({addedColumn, updatedBoard}: {addedColumn: Column, updatedBoard: Board}) => {
        socket.emit('add:column', {
          socketId: socket.id,
          addedColumn,
          updatedBoard,
          boardId: updatedBoard.id
        })
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [queryKeys.columns] }),
          queryClient.invalidateQueries({ queryKey: [queryKeys.boards] })
        ])
      }
    })

  const updateColumn = useMutation({
      mutationFn: async ({boardId, column}: {boardId: string, column: Column}) =>
        await columnService.updateColumn(column.id, column),
      onMutate: async ({boardId, column}: {boardId: string, column: Column}) => {
        // cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: [queryKeys.columns] });
    
        // snapshot old state
        const previousColumn = queryClient.getQueryData<Column[]>([queryKeys.columns]);
    
        // optimistically update cache
        queryClient.setQueryData<Column[]>([queryKeys.columns], (old) => {
          if (!old) return old;
          const idx = old.findIndex(col => col.id === column.id);
          old[idx] = column;
  
          return old; // helper that moves the task
        });
    
        return { previousColumn };
      },
      onError: async (_err, _variables, onMutateResult) => {
        // rollback if mutation fails
        if(onMutateResult){
           await queryClient.setQueryData([queryKeys.columns], onMutateResult.previousColumn);
        }
         
      },
      onSettled: async () => {
        // always refetch final truth
        await queryClient.invalidateQueries({ queryKey: [queryKeys.columns] });
      },
      onSuccess: async (column: Column, variables) => {
        const data = {
          column,
          boardId: variables.boardId
        }
        
        socket.emit('update:column', data);
      }

    });

  const insertNewColumnIntoCache = ({addedColumn, updatedBoard} : {addedColumn: Column, updatedBoard: Board}) => {
    console.log('addedColumn', addedColumn);
    console.log('updatedBoard', updatedBoard);
    queryClient.setQueryData<Column[]>([queryKeys.columns], (old) => {
      return old ? [...old, addedColumn] : [addedColumn];
    });
    queryClient.setQueryData<Board[]>([queryKeys.boards], (old) => {
      if(!old) return [updatedBoard];
      return old.map((b) => (b.id === updatedBoard.id ? updatedBoard : b));
    });
  };

  const updateColumnInCache = (column: Column) => {
    queryClient.setQueryData<Column[]>([queryKeys.columns], (old) => {
      if(!old) return;
      const idx = old?.findIndex(c => c.id === column.id);
      old[idx] = column;
      return old;
    })

  }

  const refetchColumns = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.columns]
    })
  }



  return {
    ...queryColumns,
    createColumn,
    updateColumn,
    insertNewColumnIntoCache,
    updateColumnInCache,
    refetchColumns
  }
}