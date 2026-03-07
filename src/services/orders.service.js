import { prisma } from "../common/prisma/connect.prisma.js";

export const ordersService = {
    async create(req) {
        const { userID, foodID, amount, codes, arr_sub_id } = req.body;

        const newOrder = await prisma.orders.create({
            data: {
                userID: +userID,
                foodID: +foodID,
                amount: +amount,
                codes: codes,
                arr_sub_id: arr_sub_id,
            },
        });

        return newOrder;
    },
    async remove(req) {
        const { orderID } = req.params;

        await prisma.orders.update({
            where: { id: +orderID },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy: 1,
            },
    });
       return true;
},

    async update(req) {
    const { orderID } = req.params;
    const { foodID, amount, codes, arr_sub_id } = req.body;

    await prisma.orders.update({
        where: { id: +orderID },
        data: {
            foodID: +foodID,
            amount: +amount,
            codes,
            arr_sub_id,
        },
    });

    return true;
},
};