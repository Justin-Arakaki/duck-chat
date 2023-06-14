import { authRoutes } from './authRoutes';
import { roomRoutes } from './roomRoutes';
import express from 'express';

export const router = express.Router();

router.use('', authRoutes);
router.use('/chatroom', roomRoutes);
