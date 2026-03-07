import { responseSuccess } from "../common/helpers/response.helper.js";
import { likesService } from "../services/likes.service.js";

export const likesController = {
    async toggle(req, res, next) {
        const result = await likesService.toggle(req);
        res.json(responseSuccess(result, "Toggle like successfully"));
    },
    async getByRestaurant(req, res, next) {
        const result = await likesService.getByRestaurant(req);
        res.json(responseSuccess(result, "Get likes by restaurant successfully"));
    },
    async getByUser(req, res, next) {
        const result = await likesService.getByUser(req);
        res.json(responseSuccess(result, "Get likes by user successfully"));
    },
};