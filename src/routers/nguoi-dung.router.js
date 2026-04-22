import express from "express";
import { nguoiDungController } from "../controllers/nguoi-dung.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { uploadMemoryStorage } from "../common/multer/memory-storage.multer.js";

const nguoiDungRouter = express.Router();

nguoiDungRouter.get("/me", protect, nguoiDungController.getThongTinUser);
nguoiDungRouter.get("/anh-da-luu", protect, nguoiDungController.getAnhDaLuu);
nguoiDungRouter.get("/anh-da-tao", protect, nguoiDungController.getAnhDaTao);
nguoiDungRouter.put("/me", protect, nguoiDungController.capNhatThongTin);
nguoiDungRouter.put("/avatar", protect, uploadMemoryStorage.single("anh_dai_dien"), nguoiDungController.updateAvatar);
nguoiDungRouter.get("/:id/profile", protect, nguoiDungController.getThongTinUserById);
nguoiDungRouter.get("/:id/anh", protect, nguoiDungController.getAnhDaTaoById);
nguoiDungRouter.post("/:id/follow", protect, nguoiDungController.toggleFollow);
nguoiDungRouter.get("/:id/follow", protect, nguoiDungController.kiemTraFollow);
export default nguoiDungRouter;