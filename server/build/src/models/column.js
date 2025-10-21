"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const columnSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    taskIds: {
        type: [String],
        required: true,
    },
}, {
    toJSON: {
        virtuals: true, // includes `id`
        versionKey: false, // removes `__v`
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            //delete ret.passwordHash; // hides sensitive data
            return ret;
        },
        toObject: {
            virtuals: true,
        }
    },
});
const ColumnModel = mongoose_1.default.model('Column', columnSchema);
exports.default = ColumnModel;
//# sourceMappingURL=column.js.map