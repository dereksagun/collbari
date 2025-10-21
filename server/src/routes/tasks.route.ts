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

router.put('/:id', async (req: Request<any, any, Task>, res: Response<Task>) => {
  const updatedTask = await TaskService.updateTask(req.body);
  res.json(updatedTask);
})

router.delete('/:id', async (req: Request, res: Response<void>) => {
  console.log('recieves delete')
  const id = req.params.id
  if(!id) return res.sendStatus(200);
  await TaskService.deleteTask(id)
  console.log('gets here')
  return res.sendStatus(204);
})

export default router