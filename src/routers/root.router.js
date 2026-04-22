import express from "express"
import authRouter from "./auth.router.js"
import hinhAnhRouter from "./hinh-anh.router.js"
import nguoiDungRouter from "./nguoi-dung.router.js"

const rootRouter = express.Router()

rootRouter.use("/auth", authRouter)
rootRouter.use("/hinh-anh", hinhAnhRouter)
rootRouter.use("/nguoi-dung", nguoiDungRouter)

export default rootRouter
