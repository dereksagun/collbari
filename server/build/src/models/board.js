"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const boardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    columnIds: {
        type: [String],
        required: true,
    },
    owner: {
        type: String,
        require: true
    },
    sharedWith: {
        type: [String],
        require: true
    }
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
const BoardModel = mongoose_1.default.model('Board', boardSchema);
exports.default = BoardModel;
//# sourceMappingURL=board.js.map