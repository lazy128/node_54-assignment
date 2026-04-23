import express from "express";
import { hinhAnhController } from "../controllers/hinh-anh.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { uploadMemoryStorage } from "../common/multer/memory-storage.multer.js";

const hinhAnhRouter = express.Router();

hinhAnhRouter.get("/", hinhAnhController.getDanhSachAnh);
hinhAnhRouter.get("/tim-kiem", hinhAnhController.timKiemAnh);

// FIX LỖI 404: Đổi từ /upload thành / để khớp với imageService.create của Frontend
// Nếu bạn dùng FormData để gửi ảnh, hãy đảm bảo Frontend gửi key là "file_anh"
hinhAnhRouter.post("/", protect, uploadMemoryStorage.single("file_anh"), hinhAnhController.uploadAnh);

hinhAnhRouter.get("/:id", protect, hinhAnhController.getThongTinAnh);
hinhAnhRouter.get("/:id/binh-luan", protect, hinhAnhController.getBinhLuan);
hinhAnhRouter.get("/:id/da-luu", protect, hinhAnhController.kiemTraDaLuu);
hinhAnhRouter.post("/:id/binh-luan", protect, hinhAnhController.postBinhLuan);
hinhAnhRouter.delete("/:id", protect, hinhAnhController.xoaAnh);
hinhAnhRouter.post("/:id/luu-anh", protect, hinhAnhController.luuAnh);
hinhAnhRouter.delete("/:id/luu-anh", protect, hinhAnhController.xoaLuuAnh);
hinhAnhRouter.put("/:id", protect, hinhAnhController.capNhatAnh);

export default hinhAnhRouter;