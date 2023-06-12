import express from 'express';
import { login, register } from '../controllers/authController';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);
