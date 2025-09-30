import { boards } from "../../data/boards";
import { NewBoard, Board } from "../../types";
import { v4 as uuidv4 } from 'uuid'

const getAll = async (): Promise<Board[]> => {
  return boards
}

const getBoards = async (userId: string): Promise<Board[]> => {
  const myBoards = boards.filter(board => board.owner === userId);
  const mySharedBoards = boards.filter(board => board.sharedWith.includes(userId));

  return [...myBoards, ...mySharedBoards];
}

const createBoard = async (obj: NewBoard): Promise<Board> => {
  const newBoard: Board = {
    id: uuidv4(),
    ...obj
  }
  boards.push(newBoard);
  return newBoard
  
}

const updateBoard = async (updatedBoard: Board): Promise<Board> => {
  const idx = boards.findIndex(b => b.id === updatedBoard.id);
  boards[idx] = updatedBoard;

  return updatedBoard;
}

export default {
  getAll,
  createBoard,
  updateBoard,
  getBoards
}