"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
class AuthController {
    // Registro de usuário com hash de senha e geração de token JWT
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Verifica se o usuário já existe
                const existingUser = yield userModel_1.default.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists.' });
                }
                // Hash da senha do usuário
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const user = new userModel_1.default({ email, password: hashedPassword });
                yield user.save();
                // Geração do token JWT
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(201).json({ token });
            }
            catch (error) {
                res.status(500).json({ message: 'Error registering user', error });
            }
        });
    }
    // Login de usuário com verificação de senha e geração de token JWT
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Verifica se o usuário existe
                const user = yield userModel_1.default.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: 'Invalid email or password.' });
                }
                // Verifica se a senha está correta
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid email or password.' });
                }
                // Geração do token JWT
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(500).json({ message: 'Error logging in', error });
            }
        });
    }
}
exports.default = AuthController;
