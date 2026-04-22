import { responseSuccess } from "../common/helpers/response.helper.js";
import { nguoiDungService } from "../services/nguoi-dung.service.js";

export const nguoiDungController = {
    async getThongTinUser(req, res, next) {
        const result = await nguoiDungService.getThongTinUser(req);
        const response = responseSuccess(result, "Lấy thông tin user thành công");
        res.status(response.statusCode).json(response);
    },

    async getAnhDaLuu(req, res, next) {
        const result = await nguoiDungService.getAnhDaLuu(req);
        const response = responseSuccess(result, "Lấy ảnh đã lưu thành công");
        res.status(response.statusCode).json(response);
    },

    async getAnhDaTao(req, res, next) {
        const result = await nguoiDungService.getAnhDaTao(req);
        const response = responseSuccess(result, "Lấy ảnh đã tạo thành công");
        res.status(response.statusCode).json(response);
    },

    async capNhatThongTin(req, res, next) { 
        const result = await nguoiDungService.capNhatThongTin(req);
        const response = responseSuccess(result, "Cập nhật thông tin thành công");
        res.status(response.statusCode).json(response);
    },
    // ... (các hàm cũ của bro giữ nguyên)

    // Thêm hàm updateAvatar này vào:
    async updateAvatar(req, res, next) {
        const result = await nguoiDungService.updateAvatar(req);
        const response = responseSuccess(result, "Cập nhật ảnh đại diện thành công!");
        res.status(response.statusCode).json(response);
    },
    async getThongTinUserById(req, res, next) {
        const result = await nguoiDungService.getThongTinUserById(req);
        const response = responseSuccess(result, "Lấy thông tin profile thành công");
        res.status(response.statusCode).json(response);
    },

    async getAnhDaTaoById(req, res, next) {
        const result = await nguoiDungService.getAnhDaTaoById(req);
        const response = responseSuccess(result, "Lấy danh sách ảnh thành công");
        res.status(response.statusCode).json(response);
    },

    async toggleFollow(req, res, next) {
        const result = await nguoiDungService.toggleFollow(req);
        // Lấy câu thông báo "Đã follow" hoặc "Đã unfollow" từ service truyền lên
        const response = responseSuccess(result, result.message); 
        res.status(response.statusCode).json(response);
    },

    async kiemTraFollow(req, res, next) {
        const result = await nguoiDungService.kiemTraFollow(req);
        const response = responseSuccess(result, "Kiểm tra trạng thái follow thành công");
        res.status(response.statusCode).json(response);
    }
};