import { responseSuccess } from "../common/helpers/response.helper.js";
import { usersService } from "../services/users.service.js";


export const usersController = {
   async create(req, res, next) {
      const result = await usersService.create(req);
      const response = responseSuccess(result, `Create users successfully`);
      res.status(response.statusCode).json(response);
   },

   async findAll(req, res, next) {
      const result = await usersService.findAll(req);
      const response = responseSuccess(result, `Get all users successfully`);
      res.status(response.statusCode).json(response);
   },

   async findOne(req, res, next) {
      const result = await usersService.findOne(req);
      const response = responseSuccess(result, `Get users #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async update(req, res, next) {
      const result = await usersService.update(req);
      const response = responseSuccess(result, `Update users #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async remove(req, res, next) {
      const result = await usersService.remove(req);
      const response = responseSuccess(result, `Remove users #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};