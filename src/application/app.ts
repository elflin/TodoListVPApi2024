import express from "express"
import { publicRouter } from "../Routers/public-router"
import { ErrorMiddleware } from "../middlewares/error-middleware"
import { protectedRouter } from "../Routers/protected-router"

const app = express()
app.use(express.json())
app.use(publicRouter)
app.use(protectedRouter)
app.use(ErrorMiddleware)

export default app