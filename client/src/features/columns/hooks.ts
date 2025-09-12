import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import columnService from '../../services/columns'
import type { Column, NewColumn } from "../../types";

export const useColumns = () => {
  const queryClient = useQueryClient();
  
  const queryColumns = useQuery({
    queryKey: ['columns'],
    queryFn: columnService.getAll
  })

  const createColumn = useMutation({
    mutationFn: async (column: NewColumn) => await columnService.addColumn(column),
    onSuccess: async () => await queryClient.invalidateQueries({
      queryKey: ['columns']
    })
  })

  return {
    ...queryColumns,
    createColumn
  }
}