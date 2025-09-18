import { tasks } from "../../data/task";
import { NewTask, Task } from "../../types";
import { v4 as uuidv4 } from 'uuid';

const getAll = async (): Promise<Task[]> => {
  return tasks;
}

const createTask = async (obj: NewTask): Promise<Task> => {
  const newTask: Task = {
    id: uuidv4(),
    ...obj,
  }
  tasks.push(newTask);
  return newTask;
}

const updateTask = async (obj: Task): Promise<Task> => {
  const idx = tasks.findIndex(t => t.id === obj.id);

  tasks[idx] = {
    ...obj
  }
  return tasks[idx];
}

export default {
  getAll,
  createTask,
  updateTask
}