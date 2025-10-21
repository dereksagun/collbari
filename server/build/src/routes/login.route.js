"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_service_1 = __importDefault(require("../services/users.service"));
const config_1 = __importDefault(require("../utils/config"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users_service_1.default.getUserByEmail(email);
        if (!user)
            return res.status(400).json({ error: "User doesnt exist." });
        const isValid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isValid)
            return res.status(400).json({ error: "Invalid credentials" });
        if (!config_1.default.SECRET)
            throw new Error('Environement variable is not set');
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.SECRET, { expiresIn: '10m' });
        res.status(201).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.default = router;
//# sourceMappingURL=login.route.js.map