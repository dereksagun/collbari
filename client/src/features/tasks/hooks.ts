import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { Column, NewTask, Task } from "../../types";
import taskService from '../../services/tasks';
import columnService from '../../services/columns'

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: taskService.getAll
  })

  const createTask = useMutation({
    mutationFn: async ({ column, task } : {column: Column, task: NewTask}) => {
      const addedTask: Task = await taskService.addTask(task);
      await columnService.addTaskToColumn(column, addedTask);
      return addedTask;

    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tasks']}),
        queryClient.invalidateQueries({ queryKey: ['columns']})
      ])
    }
  })

  return {
    ...tasksQuery,
    createTask
  }
  
}


