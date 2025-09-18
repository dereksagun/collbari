import { Router, Response, Request } from "express";
import { Task, NewTask } from "../../types";
import TaskService from '../services/tasks.service'

const router = Router();

router.get('/', async (req: Request, res: Response<Task[]>) => {
  res.json(await TaskService.getAll());
});

router.post('/', async (req: Request<any, any, NewTask>, res: Response<Task>) => {
  const newTask = await TaskService.createTask(req.body);
  res.json(newTask);
});

router.post('/:id', async (req: Request<any, any, Task>, res: Response<Task>) => {
  const updatedTask = await TaskService.updateTask(req.body);
  res.json(updatedTask);
})

export default router