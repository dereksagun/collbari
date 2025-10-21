import { io, Socket } from "socket.io-client";
import type { Board, Column, Task } from "../types";


let socket: Socket | null = null;

interface SocketHandlers {
  onAddTask: (data: any) => void;
  onAddColumn: (data: any) => void;
  onUpdateColumn: (data: any) => void;
  onUpdateTask: (data: any) => void;
  onDeleteTask: (data: any) => void;
}

export const connectSocket = (handlers: SocketHandlers): Socket => {
  if(!socket) {
    socket = io(import.meta.env.VITE_API_URL || '', {
      path: "/socket.io", // default, but explicit is safer
      transports: ["websocket"], // optional: helps avoid polling fallback
    });

    socket.on("add:task", handlers.onAddTask);
    socket.on("add:column", handlers.onAddColumn);
    socket.on("update:column", handlers.onUpdateColumn);
    socket.on("update:task", handlers.onUpdateTask);
    socket.on("delete:task", handlers.onDeleteTask);
  }

  return socket
}

export const getSocket = (): Socket | null => socket;

export const joinRoom = (activeBoardId: string) => {
  if(!socket) return ;
  socket.emit("joinRoom", activeBoardId);

}

export const leaveRoom = (activeBoardId: string) => {
  if(!socket) return;
  socket.emit('leaveRoom', activeBoardId);

}

export const disconnectSocket = (handlers: SocketHandlers): void => {
  if(socket) {
    
    socket.off("add:task", handlers.onAddTask);
    socket.off("add:column", handlers.onAddColumn);
    socket.off("update:column", handlers.onUpdateColumn);
    socket.off("update:task", handlers.onUpdateTask);
    socket.off("delete:task", handlers.onDeleteTask);

    socket = null;
  }
}

export const emitUpdateColumn = (data: {column: Column, boardId: string}) => {
  if(!socket) return;
  socket.emit('update:column', data);
}

export const emitAddColumn = (data: {addedColumn: Column, updatedBoard: Board, boardId: string}) => {
  if(!socket) return;

  socket.emit('add:column', data);
}

export const emitAddTask = (data: {newTask: Task, updatedColumn: Column,boardId: string}) => {
  if(!socket) return;
  socket.emit('add:task', data);
}
export const emitUpdateTask = (data: {task: Task, boardId: string}) => {
  if(!socket) return;
  socket.emit('update:task', data);
};

export const emitDeleteTask = (data: {task: string, boardId: string}) => {
  if(!socket) return;
  socket.emit('delete:task', data);
}

