import express, { Request, Response } from 'express'
import { tasks } from '../data/task';
import { columns } from '../data/columns';
import type { Task, Column, NewTask, NewColumn } from '../types';
import { v4 as uuidv4 } from 'uuid';
import taskRouter from './routes/tasks.route'
import columnRouter from './routes/columns.route'


const id: string = uuidv4();

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRouter);
app.use('/api/columns', columnRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
