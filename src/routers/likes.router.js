import express from 'express';
import { likesController } from '../controllers/likes.controller.js';

const likesRouter = express.Router();

// Tạo route CRUD
likesRouter.post('/toggle', likesController.toggle);

likesRouter.get('/restaurant/:resID', likesController.getByRestaurant);

likesRouter.get('/user/:userID', likesController.getByUser);      


export default likesRouter;