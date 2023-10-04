import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideoRepository";

const videoRoutes = Router()
const videoRepository = new VideoRepository()


videoRoutes.post('/create-video', (request, response) => {
    videoRepository.create(request, response)
})

export { videoRoutes }