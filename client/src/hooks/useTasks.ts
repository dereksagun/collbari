import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { Column, NewTask, Task } from "../types";
import taskService from '../api/tasks';
import columnService from '../api/columns';
import { emitAddTask, emitUpdateTask, emitDeleteTask } from "../services/socket";
import { queryKeys } from "./queryKeys";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: [queryKeys.tasks],
    queryFn: taskService.getAll
  })

  const createTask = useMutation({
      mutationFn: async ({ column, task } : {column: Column, task: NewTask, boardId: string}) => {
        const addedTask: Task = await taskService.addTask(task);
        const updatedColumn: Column = await columnService.addTaskToColumn(column, addedTask);
        return {addedTask, updatedColumn};
  
      },
      onSuccess: async (data, variables) => {
        emitAddTask({
          newTask: data.addedTask,
          updatedColumn: data.updatedColumn,
          boardId: variables.boardId
        })
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [queryKeys.tasks]}),
          queryClient.invalidateQueries({ queryKey: [queryKeys.columns]})
        ])
      }
  })


  const updateTask = useMutation({
    mutationFn: async ({updatedTask}: {updatedTask: Task, boardId: string}): Promise<Task> => {
      return await taskService.updateTask(updatedTask);
    },

    onSuccess: async (_task, variables) => {
      await queryClient.invalidateQueries({queryKey: [queryKeys.tasks]});
      emitUpdateTask({boardId: variables.boardId, task: variables.updatedTask});
    }
  })

  const deleteTask = useMutation({
    mutationFn: async ({taskId}: {taskId: string, boardId: string}): Promise<void> => {
      await taskService.deleteTask(taskId);
    },

    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({queryKey: [queryKeys.tasks]});
      emitDeleteTask({task: variables.taskId, boardId: variables.boardId});
    }
  })

  const insertTaskIntoCache = (data: {newTask: Task, updatedColumn: Column}) => {
    queryClient.setQueryData<Task[]>([queryKeys.tasks], (old) => {
      return old ? [...old, data.newTask] : [data.newTask];
    })
    queryClient.setQueryData<Column[]>([queryKeys.columns], (old) => {
      if(!old) return [data.updatedColumn];
      return old.map(c => c.id === data.updatedColumn.id ? data.updatedColumn : c);
    })
  }

  const updateTaskInCache = ({task}: {task: Task}) => {
    queryClient.setQueryData<Task[]>([queryKeys.tasks], (old) => {
      if(!old) return [];
      const idx = old.findIndex(t => t.id === task.id);
      old[idx] = task;
      return old;
    })
  }

  const deleteTaskInCache = ({taskId}: {taskId: string}) => {
    queryClient.setQueryData<Task[]>([queryKeys.tasks], (old) => {
      if(!old) return [];
      const idx = old.findIndex(t => t.id === taskId);
      old.splice(idx, 1);
      return old;
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
    refetchTasks,
    updateTask,
    deleteTask,
    updateTaskInCache,
    deleteTaskInCache
  }
  
}


