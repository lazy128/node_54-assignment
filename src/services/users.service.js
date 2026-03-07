import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";



export const usersService = {
    async findAll(req) {
            // sequelize
            // const resultSequelize = await Article.findAll();
    
            const { index, page, pageSize, where } = buildQueryPrisma(req);
    
            const resultPrismaPromise = prisma.users.findMany({
                where: where,
                skip: index, // skip tương đương với OFFSET
                take: pageSize, // take tương đương với LIMIT
            });
            const totalItemPromise = prisma.users.count({
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



    async create(req) {
        const body = req.body;

        console.log({ body });

        const usersNew = await prisma.users.create({
            data: {
                full_name: body.full_name,
                email: body.email,
                passwords: body.passwords,
            },
        });

        return true;
    },
    async update(req) {
        const { userId } = req.params;
        const body = req.body;

        const usersUpdate = await prisma.users.update({
            where: {
                id: Number(userId),
            },
            data: {
                full_name: body.full_name,
                email: body.email,
            },
        });

        console.log({ userId, body });

        return true;
    },
    async remove(req) {
        const { userId } = req.params;

        // delete thật trong DB: không nên saif
        // await prisma.articles.delete({
        //     where: {
        //         id: articleId,
        //     },
        // });

        await prisma.users.update({
            where: {
                id: +userId,
            },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy: 1,
            },
        });

        return true;
    },
};
