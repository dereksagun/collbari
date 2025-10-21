import { columns } from "../../data/columns";
import { Column, NewColumn } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import ColumnModel from "../models/column";

const getAll = async (): Promise<any> => {
  const columns = await ColumnModel.find({});
  const output = columns.map(c => c.toJSON()) as unknown as Column[]
  return output;
};

const createColumn = async (obj: NewColumn): Promise<any> => {
  try{
    const newColumn = new ColumnModel(obj);
    const addedColumn = await newColumn.save()
    if(!addedColumn) throw new Error('error creating column');

    return addedColumn.toJSON()
  } catch (error) {
    if(error instanceof Error){
      console.error('Error creating column:', error.message);
    }
    throw error;
  }
};

const updateColumn = async (id: string, updates: Column): Promise<any> => {
  try{
    const column = await ColumnModel.findById(id);
    if(!column) throw new Error('error updating column');

    column.name = updates.name;
    column.taskIds = updates.taskIds;

    const updatedColumn = await column.save();
    return updatedColumn;

  } catch (error) {
    if(error instanceof Error){
      console.error('Error creating column:', error.message);
    }
    throw error;
  }
}

export default {
  getAll,
  createColumn,
  updateColumn
}