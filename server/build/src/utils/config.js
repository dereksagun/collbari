"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
exports.default = {
    MONGODB_URI,
    PORT,
    SECRET
};
//# sourceMappingURL=config.js.map