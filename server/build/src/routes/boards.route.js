"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boards_service_1 = __importDefault(require("../services/boards.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    //res.json(await BoardsService.getAll());
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401);
    try {
        if (!config_1.default.SECRET)
            throw new Error('Environement variable is not set.');
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        res.json(await boards_service_1.default.getBoards(decoded.id));
    }
    catch (e) {
        return res.status(401);
    }
});
router.post('/', async (req, res) => {
    const newBoard = await boards_service_1.default.createBoard(req.body);
    res.json(newBoard);
});
router.put('/:id', async (req, res) => {
    const updatedBoard = await boards_service_1.default.updateBoard(req.body);
    res.json(updatedBoard);
});
exports.default = router;
//# sourceMappingURL=boards.route.js.map