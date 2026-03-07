import exprees from "express";
import { ordersController } from "../controllers/orders.controller.js";

const ordersRouter = exprees.Router();
ordersRouter.post("/", ordersController.create);
ordersRouter.delete("/:orderID", ordersController.remove);
ordersRouter.put("/:orderID", ordersController.update);

export default ordersRouter;
