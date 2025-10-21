"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const getAll = async () => {
    const users = await user_1.default.find({});
    return users;
};
/*
const createUser = async (obj: NewUser): Promise<User> => {
  const newUser: User = {
    id: uuidv4(),
    ...obj
  }
  users.push(newUser);
  return newUser
}
*/
const createUser = async (obj) => {
    try {
        const { email, username, password } = obj;
        const saltRounds = 10;
        const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
        const newUser = new user_1.default({ email, username, passwordHash });
        const addedUser = await newUser.save();
        if (!addedUser)
            throw new Error('Error creating user.');
        const userToReturn = addedUser.toJSON(); // <-- This will trigger the transform
        return userToReturn;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating user user:', error.message);
        }
        throw error;
    }
};
const getUserByEmail = async (email) => {
    try {
        const user = await user_1.default.findOne({ email });
        if (!user)
            throw new Error("User does not exist.");
        return user.toJSON();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error finding user:', error.message);
        }
        throw error;
    }
};
exports.default = {
    getAll,
    createUser,
    getUserByEmail
};
//# sourceMappingURL=users.service.js.map