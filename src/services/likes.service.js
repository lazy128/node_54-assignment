import { prisma } from "../common/prisma/connect.prisma.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";

export const likesService = {
    async getByRestaurant(req) {
        console.log("req.params:", req.params); 
        const { resID } = req.params;
        console.log("resID:", resID); 

        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = { resID: +resID };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.like_res.findMany({ where, skip: index, take: pageSize }),  
            prisma.like_res.count({ where }),                                  
        ]);

        console.log("totalItem:", totalItem); 
        console.log("result:", resultPrisma);

        return {
            totalItem,
            totalPage: Math.ceil(totalItem / pageSize),
            page,
            pageSize,
            items: resultPrisma,
        };
    },

    async getByUser(req) {
        const { userID } = req.params;
        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = { userID: +userID };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.like_res.findMany({ where, skip: index, take: pageSize }),  
            prisma.like_res.count({ where }),                               
        ]);

        return {
            totalItem,
            totalPage: Math.ceil(totalItem / pageSize),
            page,
            pageSize,
            items: resultPrisma,
        };
    },

    async toggle(req) {
    const { userID, resID, action } = req.body;
    console.log({ userID, resID, action });
        const existing = await prisma.like_res.findFirst({
        where: { userID: +userID, resID: +resID },
    });

    if (existing) {
        let newState = {};

        if (action === "like") {
            newState = {
                isLike: !existing.isLike, 
                isDislike: false,          
            };
        } else {
            newState = {
                isDislike: !existing.isDislike, 
                isLike: false,                  
            };
        }

        await prisma.like_res.update({
            where: { id: existing.id },
            data: newState,
        });

        return {
            liked: newState.isLike,
            disliked: newState.isDislike,
            message: action === "like"
                ? (newState.isLike ? "Liked " : "Unliked ")
                : (newState.isDislike ? "Disliked " : "Undisliked"),
        };
    } else {
        const newData = {
            userID: +userID,
            resID: +resID,
            isLike: action === "like",      
            isDislike: action === "dislike",
        };

        await prisma.like_res.create({ data: newData });

        return {
            liked: newData.isLike,
            disliked: newData.isDislike,
            message: action === "like" ? "Liked " : "Disliked ",
        };
    }
},
};