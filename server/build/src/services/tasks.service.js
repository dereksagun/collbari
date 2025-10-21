"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("../models/task"));
const getAll = async () => {
    const tasks = (await task_1.default.find({}));
    const taskObject = tasks.map(t => t.toJSON());
    return taskObject;
};
const createTask = async (obj) => {
    try {
        const newTask = new task_1.default(obj);
        const addedTask = await newTask.save();
        if (!addedTask)
            throw new Error('Issue adding task.');
        return addedTask.toJSON();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating task:', error.message);
        }
        throw error;
    }
};
const updateTask = async (obj) => {
    try {
        const task = await task_1.default.findById(obj.id);
        if (!task)
            throw new Error('Could not find task');
        task.title = obj.title;
        task.description = obj.description;
        task.completed = obj.completed;
        const updatedTask = task.save();
        return updatedTask;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating task:', error.message);
        }
        throw error;
    }
};
const deleteTask = async (id) => {
    try {
        const output = await task_1.default.findByIdAndDelete(id);
        if (!output)
            throw new Error('Issue deleting task.');
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating user user:', error.message);
        }
        throw error;
    }
};
exports.default = {
    getAll,
    createTask,
    updateTask,
    deleteTask
};
//# sourceMappingURL=tasks.service.js.map