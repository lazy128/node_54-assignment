import { responseSuccess } from "../common/helpers/response.helper.js";
import { restaurantsService } from "../services/restaurants.service.js";


export const restaurantsController = {
   async create(req, res, next) {
      const result = await restaurantsService.create(req);
      const response = responseSuccess(result, `Create restaurants successfully`);
      res.status(response.statusCode).json(response);
   },

   async findAll(req, res, next) {
      const result = await restaurantsService.findAll(req);
      const response = responseSuccess(result, `Get all restaurantss successfully`);
      res.status(response.statusCode).json(response);
   },

   async findOne(req, res, next) {
      const result = await restaurantsService.findOne(req);
      const response = responseSuccess(result, `Get restaurants #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async update(req, res, next) {
      const result = await restaurantsService.update(req);
      const response = responseSuccess(result, `Update restaurants #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async remove(req, res, next) {
      const result = await restaurantsService.remove(req);
      const response = responseSuccess(result, `Remove restaurants #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};