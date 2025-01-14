import { Router } from 'express';
import AuthController from '../controllers/authController';
import { body } from 'express-validator';
import express from 'express'; // Importando express

const router = Router();
const authController = new AuthController();

// Rota para registro de usuário com validação e sanitização
router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim().escape()
], (req: express.Request, res: express.Response) => authController.register(req, res));

// Rota para login de usuário com validação e sanitização
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim().escape()
], (req: express.Request, res: express.Response) => authController.login(req, res));

export default router;