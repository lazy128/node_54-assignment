import { prisma } from "../common/prisma/connect.prisma.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { uploadToCloudinary } from "../common/cloudinary/cloudinary.helper.js";

export const hinhAnhService = {
    async getDanhSachAnh(req) {
        const { index, page, pageSize } = buildQueryPrisma(req);

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.hinh_anh.findMany({
                where: { isDeleted: false },
                include: { nguoi_dung: true },
                skip: index,
                take: pageSize,
            }),
            prisma.hinh_anh.count({ where: { isDeleted: false } }),
        ]);

        return {
            totalItem,
            totalPage: Math.ceil(totalItem / pageSize),
            page,
            pageSize,
            items: resultPrisma,
        };
    },

    async timKiemAnh(req) {
        const { ten } = req.query;
        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = {
            isDeleted: false,
            OR: [
            { ten_hinh: { contains: ten } },
            { mo_ta: { contains: ten } },
            ],
        };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.hinh_anh.findMany({
                where,
                include: { nguoi_dung: true },
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

    async getThongTinAnh(req) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            throw new BadRequestException("ID ảnh không hợp lệ!");
        }

        const anh = await prisma.hinh_anh.findFirst({
            where: { hinh_id: +id, isDeleted: false },
            include: { nguoi_dung: true },
        });

        if (!anh) throw new BadRequestException("Ảnh không tồn tại!");

        return anh;
    },

    async getBinhLuan(req) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            throw new BadRequestException("ID ảnh không hợp lệ!");
        }

        const { index, page, pageSize } = buildQueryPrisma(req);

        const where = { hinh_id: +id, isDeleted: false };

        const [resultPrisma, totalItem] = await Promise.all([
            prisma.binh_luan.findMany({
                where,
                include: { nguoi_dung: true },
                skip: index,
                take: pageSize,
            }),
            prisma.binh_luan.count({ where }),
        ]);

        return {
            totalItem,
            totalPage: Math.ceil(totalItem / pageSize),
            page,
            pageSize,
            items: resultPrisma,
        };
    },

    async kiemTraDaLuu(req) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            throw new BadRequestException("ID ảnh không hợp lệ!");
        }

        const { nguoi_dung_id } = req.user;

        const daLuu = await prisma.luu_anh.findFirst({
            where: { hinh_id: +id, nguoi_dung_id: +nguoi_dung_id },
        });

        return { da_luu: !!daLuu };
    },

    async postBinhLuan(req) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            throw new BadRequestException("ID ảnh không hợp lệ!");
        }

        const { nguoi_dung_id } = req.user;
        const { noi_dung } = req.body;

        const anh = await prisma.hinh_anh.findFirst({
            where: { hinh_id: +id, isDeleted: false },
        });
        if (!anh) throw new BadRequestException("Ảnh không tồn tại!");

        return await prisma.binh_luan.create({
            data: {
                hinh_id: +id,
                nguoi_dung_id: +nguoi_dung_id,
                noi_dung,
            },
            include: { nguoi_dung: true },
        });
    },

    // async themAnh(req) {
    //     const { nguoi_dung_id } = req.user;
    //     const { ten_hinh, duong_dan, mo_ta } = req.body;

    //     return await prisma.hinh_anh.create({
    //         data: {
    //             ten_hinh,
    //             duong_dan,
    //             mo_ta,
    //             nguoi_dung_id: +nguoi_dung_id,
    //         },
    //     });
    // },

    async xoaAnh(req) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            throw new BadRequestException("ID ảnh không hợp lệ!");
        }

        const { nguoi_dung_id } = req.user;

        const anh = await prisma.hinh_anh.findFirst({
            where: { hinh_id: +id, isDeleted: false },
        });
        if (!anh) throw new BadRequestException("Ảnh không tồn tại!");
        if (anh.nguoi_dung_id !== +nguoi_dung_id)
            throw new BadRequestException("Bạn không có quyền xóa ảnh này!");

        return await prisma.hinh_anh.update({
            where: { hinh_id: +id },
            data: {
                isDeleted: true,
                deletedBy: +nguoi_dung_id,
                deletedAt: new Date(),
            }
        });
    },
    async luuAnh(req) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            throw new BadRequestException("ID ảnh không hợp lệ!");
        }

        const { nguoi_dung_id } = req.user;

        const anh = await prisma.hinh_anh.findFirst({
            where: { hinh_id: +id, isDeleted: false },
        });
        if (!anh) throw new BadRequestException("Ảnh không tồn tại!");

        // Nếu đã lưu rồi thì bỏ lưu (toggle)
        const daLuu = await prisma.luu_anh.findFirst({
            where: { hinh_id: +id, nguoi_dung_id: +nguoi_dung_id },
        });

        if (daLuu) {
            await prisma.luu_anh.delete({
                where: {
                    nguoi_dung_id_hinh_id: {
                        nguoi_dung_id: +nguoi_dung_id,
                        hinh_id: +id,
                    },
                },
            });
            return { da_luu: false, message: "Đã bỏ lưu ảnh" };
        }

        await prisma.luu_anh.create({
            data: { hinh_id: +id, nguoi_dung_id: +nguoi_dung_id },
        });
        return { da_luu: true, message: "Đã lưu ảnh" };
    },

    async xoaLuuAnh(req) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            throw new BadRequestException("ID ảnh không hợp lệ!");
        }

        const { nguoi_dung_id } = req.user;

        // Delete the saved record
        await prisma.luu_anh.delete({
            where: {
                nguoi_dung_id_hinh_id: {
                    nguoi_dung_id: +nguoi_dung_id,
                    hinh_id: +id,
                },
            },
        });

        return { da_luu: false, message: "Đã bỏ lưu ảnh" };
    },

    async uploadAnh(req) {
        // Lấy file từ multer
        const file = req.file;
        if (!file) {
            throw new BadRequestException("Không tìm thấy file ảnh đính kèm!");
        }

        try {
            const { nguoi_dung_id } = req.user;
            const tenHinh = req.body.ten_hinh || "Untitled";
            const moTa = req.body.mo_ta || "";

            // Upload to Cloudinary in 'uploads' folder
            const cloudinaryResult = await uploadToCloudinary(file.buffer, 'uploads');

            // Create image record with Cloudinary URL
            const hinhAnhMoi = await prisma.hinh_anh.create({
                data: {
                    ten_hinh: tenHinh,
                    duong_dan: cloudinaryResult.secure_url,
                    mo_ta: moTa,
                    nguoi_dung_id: +nguoi_dung_id,
                    cloudinary_public_id: cloudinaryResult.public_id, // Optional: store public_id for future deletion
                }
            });

            return hinhAnhMoi;
        } catch (error) {
            console.error('Image upload error:', error);
            throw new BadRequestException(`Upload ảnh thất bại: ${error.message}`);
        }
    },

    async capNhatAnh(req) {
        const { id } = req.params;
        const { nguoi_dung_id } = req.user;
        const { ten_hinh, mo_ta } = req.body;

        if (!id || isNaN(id)) throw new BadRequestException("ID ảnh không hợp lệ!");

        const anh = await prisma.hinh_anh.findFirst({
            where: { hinh_id: +id, isDeleted: false }
        });

        if (!anh) throw new BadRequestException("Ảnh không tồn tại!");
        if (anh.nguoi_dung_id !== +nguoi_dung_id) {
            throw new BadRequestException("Bạn không có quyền chỉnh sửa ảnh này!");
        }

        return await prisma.hinh_anh.update({
            where: { hinh_id: +id },
            data: { ten_hinh, mo_ta }
        });
    }
};

    