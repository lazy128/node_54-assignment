import express from "express"
import articleRouter from "./article.router.js"
import authRouter from "./auth.router.js"
import usersRouter from "./users.router.js"
import restaurantsRouter from "./restaurants.router.js"
import likesRouter from "./likes.router.js"
import ratesRouter from "./rates.router.js"
import ordersRouter from "./orders.router.js"

const rootRouter = express.Router()

rootRouter.use("/article", articleRouter)
rootRouter.use("/auth", authRouter)
rootRouter.use("/users",usersRouter)
rootRouter.use("/restaurants",restaurantsRouter)
rootRouter.use("/likes",likesRouter)
rootRouter.use("/rates",ratesRouter)
rootRouter.use("/orders",ordersRouter)
export default rootRouter
