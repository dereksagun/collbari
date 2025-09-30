import axios from 'axios';
import type { Board, Column, NewBoard } from '../types';

const baseUrl = '/api/boards';
let userToken: string = '';

const setToken = (token: string):void => {
  userToken = token;
}

const getAll = async (): Promise<Board[]> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  }
  const { data } =  await axios.get<Board[]>(baseUrl, config);
  return data;
}

const createBoard = async (newBoard: NewBoard): Promise<Board>  => {
  const { data } = await axios.post<Board>(baseUrl, newBoard);
  return data;
}

const updateBoard = async (board: Board): Promise<Board> => {
  const { data } = await axios.put<Board>(`${baseUrl}/${board.id}`, board);
  return data;
}

const addColumnToBoard = async (column: Column, board: Board): Promise<Board> => {
  board.columnIds.push(column.id)
  const { data } =  await axios.put<Board>(`${baseUrl}/${board.id}`, board);
  return data
}

export default {
  getAll,
  createBoard,
  updateBoard,
  addColumnToBoard,
  setToken

}