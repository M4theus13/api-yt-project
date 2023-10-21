"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRoutes = void 0;
const express_1 = require("express");
const VideoRepository_1 = require("../modules/videos/repositories/VideoRepository");
const autentication_1 = require("../middleware/autentication");
const videoRoutes = (0, express_1.Router)();
exports.videoRoutes = videoRoutes;
const videoRepository = new VideoRepository_1.VideoRepository();
videoRoutes.post('/create-video', autentication_1.autentication, (request, response) => {
    videoRepository.create(request, response);
});
videoRoutes.get('/get-videos/:user_id', autentication_1.autentication, (request, response) => {
    videoRepository.getVideos(request, response);
});
videoRoutes.get('/search-videos', autentication_1.autentication, (request, response) => {
    videoRepository.searchVideos(request, response);
});
