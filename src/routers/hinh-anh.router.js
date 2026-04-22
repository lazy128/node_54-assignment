import express from "express";
import { hinhAnhController } from "../controllers/hinh-anh.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { uploadMemoryStorage } from "../common/multer/memory-storage.multer.js";

const hinhAnhRouter = express.Router();

hinhAnhRouter.get("/", hinhAnhController.getDanhSachAnh);
hinhAnhRouter.get("/tim-kiem", hinhAnhController.timKiemAnh);
hinhAnhRouter.post("/upload", protect, uploadMemoryStorage.single("file_anh"), hinhAnhController.uploadAnh);

hinhAnhRouter.get("/:id", protect, hinhAnhController.getThongTinAnh);
hinhAnhRouter.get("/:id/binh-luan", protect, hinhAnhController.getBinhLuan);
hinhAnhRouter.get("/:id/da-luu", protect, hinhAnhController.kiemTraDaLuu);
hinhAnhRouter.post("/:id/binh-luan", protect, hinhAnhController.postBinhLuan);
// hinhAnhRouter.post("/", protect, hinhAnhController.themAnh);
hinhAnhRouter.delete("/:id", protect, hinhAnhController.xoaAnh);
hinhAnhRouter.post("/:id/luu-anh", protect, hinhAnhController.luuAnh);
hinhAnhRouter.delete("/:id/luu-anh", protect, hinhAnhController.xoaLuuAnh);
hinhAnhRouter.put("/:id", protect, hinhAnhController.capNhatAnh);
export default hinhAnhRouter;