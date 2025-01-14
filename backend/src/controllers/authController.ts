import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

class AuthController {
    // Registro de usuário com hash de senha e geração de token JWT
    async register(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Verifica se o usuário já existe
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists.' });
            }

            // Hash da senha do usuário
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, password: hashedPassword });
            await user.save();

            // Geração do token JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.status(201).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    // Login de usuário com verificação de senha e geração de token JWT
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Verifica se o usuário existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            // Verifica se a senha está correta
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            // Geração do token JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}

export default AuthController;