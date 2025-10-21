import { boards } from "../../data/boards";
import { NewBoard, Board } from "../../types";
import { v4 as uuidv4 } from 'uuid'
import BoardModel from "../models/board";

const getAll = async (): Promise<any> => {
  const boards = await BoardModel.find({});
  const output = boards.find(b => b.toJSON());
  return output
}

const getBoards = async (userId: string): Promise<any> => {

  const allBoards = await BoardModel.find({});
  const boards = allBoards.map(b => b.toJSON()) as unknown as Board[];

  if(!boards) return [];

  const myBoards = boards.filter(board => board.owner === userId);
  const mySharedBoards = boards.filter(board => board.sharedWith.includes(userId));
  
  return [...myBoards, ...mySharedBoards];
  /*
  
  */
}

const createBoard = async (obj: NewBoard): Promise<any> => {
  try{
    const board = new BoardModel(obj);
    const addedBoard = await board.save();
    if (!addedBoard) throw new Error ('Issue with creating board');
    return addedBoard.toJSON()
  } catch (error) {
    if(error instanceof Error){
      console.error('Error creating column:', error.message);
    }
    throw error;
  }
  
}

const updateBoard = async (boardUpdated: Board): Promise<any> => {
  try {
    const board = await BoardModel.findById(boardUpdated.id);
    if(!board) throw new Error ('Could not find board');

    board.title = boardUpdated.title;
    board.columnIds = boardUpdated.columnIds;
    board.owner = boardUpdated.owner;
    board.sharedWith = boardUpdated.sharedWith;
    
    const updatedBoard = await board.save();
    return updatedBoard;
  }catch (error) {
    if(error instanceof Error){
      console.error('Error updating column:', error.message);
    }
    throw error;
  }
}

export default {
  getAll,
  createBoard,
  updateBoard,
  getBoards
}