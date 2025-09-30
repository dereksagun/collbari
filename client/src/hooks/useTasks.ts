import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { Column, NewTask, Task } from "../types";
import taskService from '../api/tasks';
import columnService from '../api/columns';
import { socket } from "../services/socket";
import { queryKeys } from "./queryKeys";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: [queryKeys.tasks],
    queryFn: taskService.getAll
  })

  const createTask = useMutation({
      mutationFn: async ({ column, task, boardId } : {column: Column, task: NewTask, boardId: string}) => {
        const addedTask: Task = await taskService.addTask(task);
        const updatedColumn = await columnService.addTaskToColumn(column, addedTask);
        return {addedTask, updatedColumn};
  
      },
      onSuccess: async ({addedTask, updatedColumn} : {addedTask: Task, updatedColumn: Column}, variables) => {
        socket.emit('add:task', {
          socketId: socket.id, 
          newTask: addedTask, 
          updatedColumn: updatedColumn,
          boardId: variables.boardId
        });
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [queryKeys.tasks]}),
          queryClient.invalidateQueries({ queryKey: [queryKeys.columns]})
        ])
      }
  })


  const updateTask = useMutation({
    mutationFn: async (updatedTask: Task): Promise<Task> => {
      return await taskService.updateTask(updatedTask);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [queryKeys.tasks]});
    }
  })

  const insertTaskIntoCache = ({newTask, updatedColumn}: {newTask: Task, updatedColumn: Column}) => {
    queryClient.setQueryData<Task[]>([queryKeys.tasks], (old) => {
      return old ? [...old, newTask] : [newTask];
    })
    queryClient.setQueryData<Column[]>([queryKeys.columns], (old) => {
      if(!old) return [updatedColumn];
      return old.map(c => c.id === updatedColumn.id ? updatedColumn : c);
    })
  }


  const refetchTasks = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.tasks]
    })
  }

  
  return {
    ...tasksQuery,
    createTask,
    insertTaskIntoCache,
    refetchTasks
  }
  
}


