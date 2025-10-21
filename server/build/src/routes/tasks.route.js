"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_service_1 = __importDefault(require("../services/tasks.service"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    res.json(await tasks_service_1.default.getAll());
});
router.post('/', async (req, res) => {
    const newTask = await tasks_service_1.default.createTask(req.body);
    res.json(newTask);
});
router.put('/:id', async (req, res) => {
    const updatedTask = await tasks_service_1.default.updateTask(req.body);
    res.json(updatedTask);
});
router.delete('/:id', async (req, res) => {
    console.log('recieves delete');
    const id = req.params.id;
    if (!id)
        return res.sendStatus(200);
    await tasks_service_1.default.deleteTask(id);
    console.log('gets here');
    return res.sendStatus(204);
});
exports.default = router;
//# sourceMappingURL=tasks.route.js.map