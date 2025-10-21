import { tasks } from "../../data/task";
import { NewTask, Task } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import TaskModel from "../models/task";

const getAll = async (): Promise<any> => {
  const tasks = (await TaskModel.find({}));
  const taskObject: Task[] = tasks.map(t => t.toJSON()) as unknown as Task[]
  return taskObject;
}

const createTask = async (obj: NewTask): Promise<any> => {

  try {
    const newTask = new TaskModel(obj)
    const addedTask = await newTask.save();
    if(!addedTask) throw new Error ('Issue adding task.');
    return addedTask.toJSON();
  } catch (error) {
    if(error instanceof Error){
      console.error('Error creating task:', error.message);
    }
    throw error;
  }
}

const updateTask = async (obj: Task): Promise<any> => {
  try {
    const task = await TaskModel.findById(obj.id);
    if(!task) throw new Error ('Could not find task');
  
    task.title = obj.title;
    task.description = obj.description;
    task.completed = obj.completed;
    
    const updatedTask = task.save();
    return updatedTask;
  }catch (error) {
    if(error instanceof Error){
      console.error('Error updating task:', error.message);
    }
    throw error;
  }
}

const deleteTask = async (id: string): Promise<void> => {
  try {
    const output = await TaskModel.findByIdAndDelete(id);

    if(!output) throw new Error ('Issue deleting task.');
    return 
  } catch (error) {
    if(error instanceof Error){
      console.error('Error creating user user:', error.message);
    }
    throw error;
  }
}

export default {
  getAll,
  createTask,
  updateTask,
  deleteTask
}