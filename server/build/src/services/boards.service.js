"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = __importDefault(require("../models/board"));
const getAll = async () => {
    const boards = await board_1.default.find({});
    const output = boards.find(b => b.toJSON());
    return output;
};
const getBoards = async (userId) => {
    const allBoards = await board_1.default.find({});
    const boards = allBoards.map(b => b.toJSON());
    if (!boards)
        return [];
    const myBoards = boards.filter(board => board.owner === userId);
    const mySharedBoards = boards.filter(board => board.sharedWith.includes(userId));
    return [...myBoards, ...mySharedBoards];
    /*
    
    */
};
const createBoard = async (obj) => {
    try {
        const board = new board_1.default(obj);
        const addedBoard = await board.save();
        if (!addedBoard)
            throw new Error('Issue with creating board');
        return addedBoard.toJSON();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating column:', error.message);
        }
        throw error;
    }
};
const updateBoard = async (boardUpdated) => {
    try {
        const board = await board_1.default.findById(boardUpdated.id);
        if (!board)
            throw new Error('Could not find board');
        board.title = boardUpdated.title;
        board.columnIds = boardUpdated.columnIds;
        board.owner = boardUpdated.owner;
        board.sharedWith = boardUpdated.sharedWith;
        const updatedBoard = await board.save();
        return updatedBoard;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating column:', error.message);
        }
        throw error;
    }
};
exports.default = {
    getAll,
    createBoard,
    updateBoard,
    getBoards
};
//# sourceMappingURL=boards.service.js.map