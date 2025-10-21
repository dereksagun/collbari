"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        require: true
    },
}, {
    toJSON: {
        transform: (_doc, ret) => ({
            id: ret._id.toString(),
            title: ret.title,
            description: ret.description,
            completed: ret.completed,
        })
    }
});
const TaskModel = mongoose_1.default.model('Task', taskSchema);
exports.default = TaskModel;
//# sourceMappingURL=task.js.map