"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    passwordHash: String,
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
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map