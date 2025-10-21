"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const columns_service_1 = __importDefault(require("../services/columns.service"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    res.json(await columns_service_1.default.getAll());
});
router.post('/', async (req, res) => {
    const newColumn = await columns_service_1.default.createColumn(req.body);
    res.json(newColumn);
});
router.put('/:id', async (req, res) => {
    const updatedColumn = await columns_service_1.default.updateColumn(req.params.id, req.body);
    res.json(updatedColumn);
});
exports.default = router;
//# sourceMappingURL=columns.route.js.map