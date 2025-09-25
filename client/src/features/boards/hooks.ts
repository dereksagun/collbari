import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import boardService from '../../services/boards';
import type { Board, NewBoard } from "../../types";


export const useBoards = () => {
  const queryClient = useQueryClient();


  const boardsQuery = useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: boardService.getAll
  })

  const createBoard = useMutation({
    mutationFn: async (newBoard: NewBoard) => await boardService.createBoard(newBoard),
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ['boards']
      })
    }
  })

  const updateBoard = useMutation({
    mutationFn: async (updatedBoard: Board) => await boardService.updateBoard(updatedBoard),
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ['boards']
      })
    }
  })


  return {
    ...boardsQuery,
    createBoard,
    updateBoard

  }
}