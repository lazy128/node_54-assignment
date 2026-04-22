import { prisma } from "../common/prisma/connect.prisma.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { uploadToCloudinary } from "../common/cloudinary/cloudinary.helper.js";

export const nguoiDungService = {
    async getThongTinUser(req) {
        const { nguoi_dung_id } = req.user;

        return await prisma.nguoi_dung.findFirst({
            where: { nguoi_dung_id: +nguoi_dung_id },
            select: {
                nguoi_dung_id: true,
                email: true,
                ho_ten: true,
                tuoi: true,
                anh_dai_dien: true,
            },
        });
    },

    async getAnhDaLuu(req) {
        const { nguoi_dung_id } = req.user;
        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = { nguoi_dung_id: +nguoi_dung_id };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.luu_anh.findMany({
                where,
                include: { hinh_anh: true },
                skip: index,
                take: pageSize,
            }),
            prisma.luu_anh.count({ where }),
        ]);

        return {
            totalItem,
            totalPage: Math.ceil(totalItem / pageSize),
            page,
            pageSize,
            items: resultPrisma,
        };
    },

    async getAnhDaTao(req) {
        const { nguoi_dung_id } = req.user;
        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = { nguoi_dung_id: +nguoi_dung_id, isDeleted: false };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.hinh_anh.findMany({
                where,
                skip: index,
                take: pageSize,
            }),
            prisma.hinh_anh.count({ where }),
        ]);

        return {
            totalItem,
            totalPage: Math.ceil(totalItem / pageSize),
            page,
            pageSize,
            items: resultPrisma,
        };
    },

    async capNhatThongTin(req) {
        const { nguoi_dung_id } = req.user;
        const { ho_ten, tuoi, anh_dai_dien } = req.body;

        return await prisma.nguoi_dung.update({
            where: { nguoi_dung_id: +nguoi_dung_id },
            data: { ho_ten, tuoi, anh_dai_dien },
        });
    },
    async updateAvatar(req) {
        const file = req.file;
        if (!file) throw new BadRequestException("Không có ảnh!");

        try {
            const cloudinaryResult = await uploadToCloudinary(file.buffer, 'avatars');
            return await prisma.nguoi_dung.update({
                where: { nguoi_dung_id: req.user.nguoi_dung_id },
                data: { anh_dai_dien: cloudinaryResult.secure_url }
            });
        } catch (error) {
            console.error('Avatar upload error:', error);
            throw new BadRequestException(`Upload ảnh thất bại: ${error.message}`);
        }
    },

    async getThongTinUserById(req) {
        const { id } = req.params;
        
        // 1. Chỉ lấy thông tin cơ bản và đếm số ảnh
        const user = await prisma.nguoi_dung.findFirst({
            where: { nguoi_dung_id: +id },
            select: {
                nguoi_dung_id: true,
                email: true,
                ho_ten: true,
                tuoi: true,
                anh_dai_dien: true,
                _count: {
                    select: {
                        hinh_anh: { where: { isDeleted: false } },
                    }
                }
            },
        });

        if (!user) throw new BadRequestException("User không tồn tại!");

        // 2. Đếm thủ công số người theo dõi từ bảng follow
        const followersCount = await prisma.follow.count({
            where: { following_id: +id }
        });

        const followingCount = await prisma.follow.count({
            where: { follower_id: +id }
        });

        // 3. Trả về cho Frontend
        return {
            ...user,
            _count: {
                ...user._count,
                followers: followersCount,
                following: followingCount
            }
        };
    },

    async getAnhDaTaoById(req) {
        const { id } = req.params;
        const { index, page, pageSize } = buildQueryPrisma(req);
        const where = { nguoi_dung_id: +id, isDeleted: false };
        const [items, totalItem] = await Promise.all([
        prisma.hinh_anh.findMany({ where, skip: index, take: pageSize }),
        prisma.hinh_anh.count({ where }),
    ]);
    return { totalItem, totalPage: Math.ceil(totalItem/pageSize), page, pageSize, items };
},

async toggleFollow(req) {
    const { nguoi_dung_id } = req.user;
    const { id } = req.params;
    if (+nguoi_dung_id === +id) throw new BadRequestException("Không thể follow bản thân!");

    const existing = await prisma.follow.findFirst({
        where: { follower_id: +nguoi_dung_id, following_id: +id },
    });

    if (existing) {
        await prisma.follow.delete({
            where: { follower_id_following_id: { follower_id: +nguoi_dung_id, following_id: +id } }
        });
        return { following: false, message: "Đã unfollow" };
    }

    await prisma.follow.create({
        data: { follower_id: +nguoi_dung_id, following_id: +id }
    });
    return { following: true, message: "Đã follow" };
},

async kiemTraFollow(req) {
    const { nguoi_dung_id } = req.user;
    const { id } = req.params;
    const existing = await prisma.follow.findFirst({
        where: { follower_id: +nguoi_dung_id, following_id: +id },
    });
    return { following: !!existing };
}
};