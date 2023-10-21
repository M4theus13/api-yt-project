import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideoRepository";
import { autentication } from "../middleware/autentication";

const videoRoutes = Router()
const videoRepository = new VideoRepository()


videoRoutes.post('/create-video', autentication, (request, response) => {
    videoRepository.create(request, response)
})

videoRoutes.get('/get-videos/:user_id',autentication, (request, response) => {
    videoRepository.getVideos(request, response)
})

videoRoutes.get('/search-videos', autentication, (request, response) => {
    videoRepository.searchVideos(request, response)
})

videoRoutes.delete('/delete-video', autentication, (request, response) => {
    videoRepository.deleteVideo(request, response)
})


export { videoRoutes }