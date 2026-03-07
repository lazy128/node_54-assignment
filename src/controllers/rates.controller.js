import { responseSuccess } from "../common/helpers/response.helper.js";
import { ratesService } from "../services/rates.service.js";

export const ratesController = {
    async create(req, res, next) {
        const result = await ratesService.create(req);
        res.json(responseSuccess(result, "Create rate successfully"));
    },
    async getByRestaurant(req, res, next) {
        const result = await ratesService.getByRestaurant(req);
        res.json(responseSuccess(result, "Get rates by restaurant successfully"));
    },
    async getByUser(req, res, next) {
        const result = await ratesService.getByUser(req);
        res.json(responseSuccess(result, "Get rates by user successfully"));
    },
    async update(req, res, next) {
        const result = await ratesService.update(req);
        res.json(responseSuccess(result, "Update rate successfully"));
    },
    async remove(req, res, next) { 
        const result = await ratesService.remove(req);
        res.json(responseSuccess(result, "Remove rate successfully"));
    },
};