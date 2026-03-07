import express from "express";
import { usersController } from "../controllers/users.controller.js";

const usersRouter= express.Router()

usersRouter.get("",usersController.findAll);

usersRouter.post("",usersController.create)

usersRouter.put("/:userId", usersController.update);

usersRouter.delete("/:userId", usersController.remove);
export default usersRouter;

 