import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import boardService from '../api/boards';
import type { Board, NewBoard } from "../types";
import { queryKeys } from "./queryKeys";


export const useBoards = () => {
  const queryClient = useQueryClient();


  const boardsQuery = useQuery<Board[]>({
    queryKey: [queryKeys.boards],
    queryFn: boardService.getAll
  })

  const createBoard = useMutation({
    mutationFn: async (newBoard: NewBoard) => await boardService.createBoard(newBoard),
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.boards]
      })
    }
  })

  const updateBoard = useMutation({
    mutationFn: async (updatedBoard: Board) => await boardService.updateBoard(updatedBoard),
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.boards]
      })
    }
  })

  const refetchBoards = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.boards]
    })
  }


  return {
    ...boardsQuery,
    createBoard,
    updateBoard,
    refetchBoards

  }
}