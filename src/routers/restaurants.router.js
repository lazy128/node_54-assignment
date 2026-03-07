import express from "express";
import { restaurantsController } from "../controllers/restaurants.controller.js";

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", restaurantsController.findAll);

restaurantsRouter.get("/:restaurantId", restaurantsController.findOne);

restaurantsRouter.post("/", restaurantsController.create);

restaurantsRouter.put("/:restaurantId", restaurantsController.update);

restaurantsRouter.delete("/:restaurantId", restaurantsController.remove);

export default restaurantsRouter;