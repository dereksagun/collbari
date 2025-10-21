"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = __importDefault(require("../services/users.service"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    res.json(await users_service_1.default.getAll());
});
router.post('/', async (req, res) => {
    const newUser = await users_service_1.default.createUser(req.body);
    res.json(newUser);
});
exports.default = router;
//# sourceMappingURL=users.route.js.map