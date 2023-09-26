import express, { request, response }  from "express";
import { userRoutes } from "./routes/user.routes";
import { videoRoutes } from "./routes/videos.routes";

const app = express()

app.use(express.json())

app.use('/user', userRoutes)
app.use('/videos', videoRoutes)

app.listen(4000)