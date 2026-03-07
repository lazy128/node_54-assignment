import { responseSuccess } from "../common/helpers/response.helper.js";
import { articleService } from "../services/article.service.js";



export const articleController = {
    async findAll(req, res, next) {
        const result = await articleService.findAll(req);
        const response= responseSuccess(result,"lay danh sach article thanh cong",201)
        res.status(response.statusCode).json(response);
    },
    async create(req, res, next) {
        const result = await articleService.create(req);
        const response= responseSuccess(result,"tao article thanh cong",201)
        res.status(response.statusCode).json(response);
    },
    async update(req, res, next) {
        const result = await articleService.update(req);
        const response= responseSuccess(result,"cap nhat article thanh cong",201)
        res.status(response.statusCode).json(response);
    },
    async delete(req, res, next) {
        const result = await articleService.delete(req);
        const response= responseSuccess(result,"xoa article thanh cong",201)
        res.status(response.statusCode).json(response);
    },
};


//trong object thi findAll la 1 method va abc: 123 la 1 key value pair