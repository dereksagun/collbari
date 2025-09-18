import { useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import columnService from '../../services/columns'
import type { Column, NewColumn } from "../../types";
import columns from "../../services/columns";
import { arrayMove } from "@dnd-kit/sortable";

export const useColumns = () => {
  const queryClient = useQueryClient();
  
  const queryColumns = useQuery<Column[]>({
    queryKey: ['columns'],
    queryFn: columnService.getAll
  })

  const createColumn = useMutation({
    mutationFn: async (column: NewColumn) => await columnService.addColumn(column),
    onSuccess: async () => await queryClient.invalidateQueries({
      queryKey: ['columns']
    })
  })
  /*
  const updateColumn = useMutation({
    mutationFn: async({id, column} : {id: string, column: Column}) => await columnService.updateColumn(id, column),
    onSuccess: async () => await queryClient.invalidateQueries({
      queryKey:['columns']
    })
  })
    */

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
    }
  });

  return {
    ...queryColumns,
    createColumn,
    updateColumn
  }
}