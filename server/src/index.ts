import express, { Request, Response } from 'express'
import { tasks } from '../data/task';
import { columns } from '../data/columns';
import type { Task, Column, NewTask, NewColumn, Board } from '../types';
import { v4 as uuidv4 } from 'uuid';
import taskRouter from './routes/tasks.route';
import columnRouter from './routes/columns.route';
import boardRouter from './routes/boards.route';
import userRouter from './routes/users.route';
import loginRouter from './routes/login.route';

import { Server } from "socket.io";


const { createServer } = require('node:http');
const id: string = uuidv4();

const app = express();
const server = createServer(app);
const io = new Server(server)

app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send('pong');
})

app.use('/api/tasks', taskRouter);
app.use('/api/columns', columnRouter);
app.use('/api/boards', boardRouter);
app.use('/api/register', userRouter);
app.use('/api/auth/login', loginRouter);


io.on('connect', (socket) => {
  console.log(`a user connected at ${socket.id}`);

  socket.on('leaveRoom', (boardId) => {
    socket.leave(boardId)
    console.log(`Socket ${socket.id} left ${boardId}`);
  })

  socket.on('joinRoom', (boardId)=> {
    socket.join(boardId);
    console.log(`Socket ${socket.id} joined room: ${boardId}`);
    
  })

  socket.on('add:task', data => {
    console.log(`Recieved add:task`);
    console.log(data);
    socket.to(data.boardId).emit('add:task', data);
  });

  socket.on('add:column', data => {
    console.log(`Recieved add:column`);
    console.log(data);
    socket.to(data.boardId).emit('add:column', data);
  })

  socket.on('update:column', data => {
    console.log('Received update:column');
    socket.to(data.boardId).emit('update:column', data.column);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
  
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
