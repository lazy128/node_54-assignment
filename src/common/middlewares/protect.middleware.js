import { tokenService } from "../../services/token.service.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/connect.prisma.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException("Không có token");
    }

    const accessToken = authHeader.split(' ')[1];

    const decode = tokenService.verifyAccessToken(accessToken);

    const userExits = await prisma.nguoi_dung.findUnique({
        where: {
            nguoi_dung_id: decode.userId,
        },
    });

    if (!userExits) {
        throw new UnauthorizedException("Người dùng không tồn tại");
    }

    req.user = userExits;
    next();
};