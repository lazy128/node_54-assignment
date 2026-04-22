import { responseSuccess } from "../common/helpers/response.helper.js";
import { hinhAnhService } from "../services/hinh-anh.service.js";

export const hinhAnhController = {
    async getDanhSachAnh(req, res, next) {
        const result = await hinhAnhService.getDanhSachAnh(req);
        const response = responseSuccess(result, "Lấy danh sách ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async timKiemAnh(req, res, next) {
        const result = await hinhAnhService.timKiemAnh(req);
        const response = responseSuccess(result, "Tìm kiếm ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async getThongTinAnh(req, res, next) {
        const result = await hinhAnhService.getThongTinAnh(req);
        const response = responseSuccess(result, "Lấy thông tin ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async getBinhLuan(req, res, next) {
        const result = await hinhAnhService.getBinhLuan(req);
        const response = responseSuccess(result, "Lấy bình luận thành công");
        res.status(response.statusCode).json(response);
    },

    async kiemTraDaLuu(req, res, next) {
        const result = await hinhAnhService.kiemTraDaLuu(req);
        const response = responseSuccess(result, "Kiểm tra lưu ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async postBinhLuan(req, res, next) {
        const result = await hinhAnhService.postBinhLuan(req);
        const response = responseSuccess(result, "Bình luận thành công");
        res.status(response.statusCode).json(response);
    },

    async themAnh(req, res, next) {
        const result = await hinhAnhService.themAnh(req);
        const response = responseSuccess(result, "Thêm ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async xoaAnh(req, res, next) {
        const result = await hinhAnhService.xoaAnh(req);
        const response = responseSuccess(result, "Xóa ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async luuAnh(req, res, next) {
        const result = await hinhAnhService.luuAnh(req);
        const response = responseSuccess(result, "Lưu ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async xoaLuuAnh(req, res, next) {
        const result = await hinhAnhService.xoaLuuAnh(req);
        const response = responseSuccess(result, "Đã bỏ lưu ảnh");
        res.status(response.statusCode).json(response);
    },
    async uploadAnh(req, res, next) {
        const result = await hinhAnhService.uploadAnh(req);
        const response = responseSuccess(result, "Upload và lưu DB thành công rực rỡ!");
        res.status(response.statusCode).json(response);
    },
    async capNhatAnh(req, res, next) {
        try {
            const result = await hinhAnhService.capNhatAnh(req);
            const response = responseSuccess(result, "Cập nhật ảnh thành công!");
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    }
};