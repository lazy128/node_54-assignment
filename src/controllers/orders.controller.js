import { responseSuccess } from "../common/helpers/response.helper.js";
import { ordersService } from "../services/orders.service.js";

export const ordersController = {
    async create(req, res, next) {
        const result = await ordersService.create(req);
        res.json(responseSuccess(result, "Order placed successfully"));
    },
    async remove(req, res, next) {
    const result = await ordersService.remove(req);
    res.json(responseSuccess(result, "Remove order successfully"));
    },
    async update(req, res, next) {
    const result = await ordersService.update(req);
    res.json(responseSuccess(result, "Update order successfully"));
    },
};