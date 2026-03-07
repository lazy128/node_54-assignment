import { Router } from "express";
import { ratesController } from "../controllers/rates.controller.js";

const ratesRouter = Router();
ratesRouter.post("/", ratesController.create);
ratesRouter.get("/restaurant/:resID", ratesController.getByRestaurant);
ratesRouter.get("/user/:userID", ratesController.getByUser);
ratesRouter.put("/:rateID", ratesController.update);     
ratesRouter.delete("/:rateID", ratesController.remove);  

    
export default ratesRouter;