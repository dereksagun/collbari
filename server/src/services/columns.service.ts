import { columns } from "../../data/columns";
import { Column, NewColumn } from "../../types";
import { v4 as uuidv4 } from 'uuid';


const getAll = async (): Promise<Column[]> => {
  return columns;
};

const createColumn = async (obj: NewColumn): Promise<Column> => {
  const newColumn = {
    id: uuidv4(),
    ...obj
  }
  columns.push(newColumn);
  return newColumn;
};


const updateColumn = async (id: string, updates: Column): Promise<Column> => {
  const idx = columns.findIndex(col => col.id === id);
  columns[idx] = {...columns[idx], ...updates};

  return columns[idx];

}

export default {
  getAll,
  createColumn,
  updateColumn
}