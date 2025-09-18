import axios from 'axios'
import type { Column, NewColumn, Task } from '../types';

const baseUrl = '/api/columns';

const getAll = async (): Promise<Column[]> => {
  const { data } = await axios.get<Column[]>(baseUrl);
  return data;
}

const addColumn = async (obj: NewColumn): Promise<Column> => {
  const { data } = await axios.post<Column>(baseUrl, obj);
  return data;

}

const addTaskToColumn = async (column: Column, task: Task): Promise<Column> => {
  column.taskIds.push(task.id);
  const { data } =  await axios.put<Column>(`${baseUrl}/${column.id}`, column);
  return data
}

const updateColumn = async (id: string, column: Column): Promise<Column> => {
  const { data } = await axios.put<Column>(`${baseUrl}/${id}`, column);
  return data;
}

export default {
  getAll,
  addColumn,
  addTaskToColumn,
  updateColumn
}