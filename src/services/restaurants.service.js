import { prisma } from "../common/prisma/connect.prisma.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";


export const restaurantsService = {
    async findAll(req) {
            // sequelize
            // const resultSequelize = await Article.findAll();
    
            const { index, page, pageSize, where } = buildQueryPrisma(req);
    
            const resultPrismaPromise = prisma.restaurants.findMany({
                where: where,
                skip: index, // skip tương đương với OFFSET
                take: pageSize, // take tương đương với LIMIT
            });
            const totalItemPromise = prisma.restaurants.count({
                // ở findMany mà where cái gì thì đưa vào count giống như vậy
                where: where,
            });
    
            const [resultPrisma, totalItem] = await Promise.all([resultPrismaPromise, totalItemPromise]);
    
            const totalPage = Math.ceil(totalItem / pageSize);
    
            return {
                totalItem: totalItem,
                totalPage: totalPage,
                page: page,
                pageSize: pageSize,
                items: resultPrisma,
            };
        },

    async findOne(req) {
        const { restaurantId } = req.params;
        const restaurant = await prisma.restaurants.findFirst({
            where: {
                id: Number(restaurantId),
                isDeleted: false,
            },
        });
        return restaurant;
    },

    async create(req) {
        const body = req.body;
        await prisma.restaurants.create({
            data: {
                res_name: body.res_name,
                imageUrl: body.imageUrl,
                descriptions: body.descriptions,
            },
        });
        return true;
    },

    async update(req) {
        const { restaurantId } = req.params;
        const body = req.body;
        await prisma.restaurants.update({
            where: { id: Number(restaurantId) },
            data: {
                res_name: body.res_name,
                imageUrl: body.imageUrl,
                descriptions: body.descriptions,
            },
        });
        return true;
    },

    async remove(req) {
        const { restaurantId } = req.params;
        await prisma.restaurants.update({
            where: { id: Number(restaurantId) },
            data: {
                isDeleted: true,           // đánh dấu đã xóa
                deletedAt: new Date(),     // thời điểm xóa
                deletedBy: 1,             // id của user thực hiện xóa
            },
        });
        return true;
    },
};