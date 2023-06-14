import express from 'express';
import { createRoom } from '../controllers/roomController';
import authzMiddleware from '../middlewares/authzMiddleware';

export const roomRoutes = express.Router();

roomRoutes.post('/create', authzMiddleware, createRoom);
