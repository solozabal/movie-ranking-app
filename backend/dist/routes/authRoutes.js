"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const authController = new authController_1.default();
// Rota para registro de usuário com validação e sanitização
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).trim().escape()
], (req, res) => authController.register(req, res));
// Rota para login de usuário com validação e sanitização
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).trim().escape()
], (req, res) => authController.login(req, res));
exports.default = router;
