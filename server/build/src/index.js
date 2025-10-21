"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_route_1 = __importDefault(require("./routes/tasks.route"));
const columns_route_1 = __importDefault(require("./routes/columns.route"));
const boards_route_1 = __importDefault(require("./routes/boards.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const socket_io_1 = require("socket.io");
const { createServer } = require('node:http');
const app = (0, express_1.default)();
const server = createServer(app);
const io = new socket_io_1.Server(server);
if (!config_1.default.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}
mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
});
app.use(express_1.default.json());
app.get('/api/ping', (req, res) => {
    res.send('pong');
});
app.use('/api/tasks', tasks_route_1.default);
app.use('/api/columns', columns_route_1.default);
app.use('/api/boards', boards_route_1.default);
app.use('/api/register', users_route_1.default);
app.use('/api/auth/login', login_route_1.default);
io.on('connect', (socket) => {
    console.log(`a user connected at ${socket.id}`);
    socket.on('leaveRoom', (boardId) => {
        socket.leave(boardId);
        console.log(`Socket ${socket.id} left ${boardId}`);
    });
    socket.on('joinRoom', (boardId) => {
        socket.join(boardId);
        console.log(`Socket ${socket.id} joined room: ${boardId}`);
    });
    socket.on('add:task', data => {
        console.log(`Recieved add:task`);
        socket.to(data.boardId).emit('add:task', data);
    });
    socket.on('add:column', data => {
        console.log(`Recieved add:column`);
        socket.to(data.boardId).emit('add:column', data);
    });
    socket.on('update:task', data => {
        console.log('Received update:task');
        socket.to(data.boardId).emit('update:task', data);
    });
    socket.on('delete:task', data => {
        console.log('Received delete:task');
        socket.to(data.boardId).emit('delete:task', data);
    });
    socket.on('update:column', data => {
        console.log('Received update:column');
        socket.to(data.boardId).emit('update:column', data.column);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
const PORT = config_1.default.PORT;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map