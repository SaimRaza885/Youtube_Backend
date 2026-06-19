import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controllers.js"
import VerifyJWT from "../middleware/auth.middleware.js"
import {upload} from "../middleware/multer.middleware.js"

const router = Router();

router
    .route("/")
    .get(getAllVideos)
    .post(
        VerifyJWT,
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(VerifyJWT, deleteVideo)
    .patch(VerifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(VerifyJWT, togglePublishStatus);

export default router