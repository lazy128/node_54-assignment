import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";

export const authService = {
    async register(req) {
        const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

        const userExists = await prisma.nguoi_dung.findUnique({
            where: { email },
        });

        if (userExists) {
            throw new BadRequestException("Người dùng đã tồn tại, vui lòng đăng nhập");
        }

        const passwordHash = bcrypt.hashSync(mat_khau, 10);

        const userNew = await prisma.nguoi_dung.create({
            data: {
                email,
                mat_khau: passwordHash,
                ho_ten,
                tuoi,
                anh_dai_dien,
            },
        });

        return true;
    },

    async login(req) {
        const { email, mat_khau } = req.body;

        const userExist = await prisma.nguoi_dung.findUnique({
            where: { email },
        });

        if (!userExist) {
            throw new BadRequestException("Người dùng chưa tồn tại, vui lòng đăng ký");
        }

        const isPassword = bcrypt.compareSync(mat_khau, userExist.mat_khau);

        if (!isPassword) {
            throw new BadRequestException("Mật khẩu sai");
        }

        const accessToken = tokenService.createAccessToken(userExist.nguoi_dung_id);

        return {
            accessToken,
        };
    },
};