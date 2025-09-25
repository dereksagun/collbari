import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import columnService from '../../services/columns';
import boardService from '../../services/boards';

import type { Board, Column, NewColumn } from "../../types";
import { socket } from "../../services/socket";

export const useColumns = () => {
  const queryClient = useQueryClient();
  
  const queryColumns = useQuery<Column[]>({
    queryKey: ['columns'],
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
          updatedBoard
        })
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['columns'] }),
          queryClient.invalidateQueries({ queryKey: ['boards'] })
        ])
      }
    })

  const updateColumn = useMutation({
      mutationFn: async (column : Column) =>
        await columnService.updateColumn(column.id, column),
      onMutate: async (column: Column) => {
        // cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: ["columns"] });
    
        // snapshot old state
        const previousColumn = queryClient.getQueryData<Column[]>(["columns"]);
    
        // optimistically update cache
        queryClient.setQueryData<Column[]>(["columns"], (old) => {
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
           await queryClient.setQueryData(["columns"], onMutateResult.previousColumn);
        }
         
      },
      onSettled: async () => {
        // always refetch final truth
        await queryClient.invalidateQueries({ queryKey: ["columns"] });
      },
      onSuccess: async (column: Column) => {
        socket.emit('update:column', column);
      }

    });

  const insertNewColumnIntoCache = ({addedColumn, updatedBoard} : {addedColumn: Column, updatedBoard: Board}) => {
    console.log('addedColumn', addedColumn);
    console.log('updatedBoard', updatedBoard);
    queryClient.setQueryData<Column[]>(['columns'], (old) => {
      //console.log('test', old)
      //console.log(old ? [...old, addedColumn] : [addedColumn])
      //console.log("old boards ref === new boards ref?", old === (old ? [...old, addedColumn] : [addedColumn]));
      return old ? [...old, addedColumn] : [addedColumn];
    });
    queryClient.setQueryData<Board[]>(['boards'], (old) => {
      if(!old) return [updatedBoard];
      //console.log(old)
      //console.log(updatedBoard)
      //console.log(old.map(b => b.id === updatedBoard.id ? updatedBoard : b))
      //console.log("old boards ref === new boards ref?");
      return old.map((b) => (b.id === updatedBoard.id ? updatedBoard : b));
    });
  };

  const updateColumnInCache = (column: Column) => {
    queryClient.setQueryData<Column[]>(['columns'], (old) => {
      console.log('tester');
      console.log(column)
      if(!old) return;
      const idx = old?.findIndex(c => c.id === column.id);
      old[idx] = column;
      return old;
    })

  }




  return {
    ...queryColumns,
    createColumn,
    updateColumn,
    insertNewColumnIntoCache,
    updateColumnInCache
  }
}