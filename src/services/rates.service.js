import { prisma } from "../common/prisma/connect.prisma.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";

export const ratesService = {
    async getByRestaurant(req) {
        const { resID } = req.params; 
        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = { resID: +resID };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.rate_res.findMany({ where, skip: index, take: pageSize }), 
            prisma.rate_res.count({ where }),
        ]);

        return { totalItem, totalPage: Math.ceil(totalItem / pageSize), page, pageSize, items: resultPrisma };
    },

    async getByUser(req) {
        const { userID } = req.params;
        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = { userID: +userID };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.rate_res.findMany({ where, skip: index, take: pageSize }),
            prisma.rate_res.count({ where }),
        ]);

        return { totalItem, totalPage: Math.ceil(totalItem / pageSize), page, pageSize, items: resultPrisma };
    },

    async create(req) {
        const { userID, resID, amount, contents } = req.body;

        await prisma.rate_res.create({
            data: {
                userID: +userID,
                resID: +resID,
                amount: +amount,
                contents: contents,
                date_rate: new Date(),
            },
        });

        return true;
    },

    async update(req) {
        const { rateID } = req.params;
        const { contents } = req.body;

        await prisma.rate_res.update({
            where: { id: +rateID },
            data: { contents },
        });

        return true;
    },

    async remove(req) {
        const { rateID } = req.params;

        await prisma.rate_res.update({
            where: { id: +rateID },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy: 1,
            },
        });

        return true;
    },
};