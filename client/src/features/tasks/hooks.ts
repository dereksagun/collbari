import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { Column, NewTask, Task } from "../../types";
import taskService from '../../services/tasks';
import columnService from '../../services/columns'
import { socket } from "../../services/socket";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: taskService.getAll
  })

  const createTask = useMutation({
      mutationFn: async ({ column, task } : {column: Column, task: NewTask}) => {
        const addedTask: Task = await taskService.addTask(task);
        const updatedColumn = await columnService.addTaskToColumn(column, addedTask);
        return {addedTask, updatedColumn};
  
      },
      onSuccess: async ({addedTask, updatedColumn} : {addedTask: Task, updatedColumn: Column}) => {
        socket.emit('add:task', {
          socketId: socket.id, 
          newTask: addedTask, 
          updatedColumn: updatedColumn
        });
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['tasks']}),
          queryClient.invalidateQueries({ queryKey: ['columns']})
        ])
      }
  })


  const updateTask = useMutation({
    mutationFn: async (updatedTask: Task): Promise<Task> => {
      return await taskService.updateTask(updatedTask);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tasks']});
    }
  })

  const insertTaskIntoCache = ({newTask, updatedColumn}: {newTask: Task, updatedColumn: Column}) => {
    queryClient.setQueryData<Task[]>(['tasks'], (old) => {
      return old ? [...old, newTask] : [newTask];
    })
    queryClient.setQueryData<Column[]>(['columns'], (old) => {
      if(!old) return [updatedColumn];
      return old.map(c => c.id === updatedColumn.id ? updatedColumn : c);
    })
  }

  return {
    ...tasksQuery,
    createTask,
    insertTaskIntoCache
  }
  
}


