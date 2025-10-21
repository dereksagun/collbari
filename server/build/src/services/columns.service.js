"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = __importDefault(require("../models/column"));
const getAll = async () => {
    const columns = await column_1.default.find({});
    const output = columns.map(c => c.toJSON());
    return output;
};
const createColumn = async (obj) => {
    try {
        const newColumn = new column_1.default(obj);
        const addedColumn = await newColumn.save();
        if (!addedColumn)
            throw new Error('error creating column');
        return addedColumn.toJSON();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating column:', error.message);
        }
        throw error;
    }
};
const updateColumn = async (id, updates) => {
    try {
        const column = await column_1.default.findById(id);
        if (!column)
            throw new Error('error updating column');
        column.name = updates.name;
        column.taskIds = updates.taskIds;
        const updatedColumn = await column.save();
        return updatedColumn;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating column:', error.message);
        }
        throw error;
    }
};
exports.default = {
    getAll,
    createColumn,
    updateColumn
};
//# sourceMappingURL=columns.service.js.map