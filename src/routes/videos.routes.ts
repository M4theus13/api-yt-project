import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideoRepository";

const videoRoutes = Router()
const videoRepository = new VideoRepository()


videoRoutes.post('/create-video', (request, response) => {
    videoRepository.create(request, response)
})

videoRoutes.get('/get-videos/:user_id', (request, response) => {
    videoRepository.getVideos(request, response)
})

videoRoutes.get('/search-videos', (request, response) => {
    videoRepository.searchVideos(request, response)
})


export { videoRoutes }