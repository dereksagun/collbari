import axios from 'axios'
import type { Task, NewTask } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || ''
const baseUrl = `${API_BASE}/api/tasks`;

const getAll = async (): Promise<Task[]> => {
  const { data } = await axios.get<Task[]>(baseUrl);
  return data;
};

const addTask = async (obj: NewTask): Promise<Task> => {
  const { data } = (await axios.post<Task>(baseUrl, obj));
  return data;
};

const updateTask = async (obj: Task): Promise<Task> => {
  const { data } = (await axios.put<Task>(`${baseUrl}/${obj.id}`, obj));
  return data;
}

const deleteTask = async (id: string): Promise<void> => {
  await axios.delete<void>(`${baseUrl}/${id}`)
}

export default {
  getAll,
  addTask,
  updateTask,
  deleteTask
};