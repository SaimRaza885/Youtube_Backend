import { Router } from "express";
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controllers.js";
import VerifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/:videoId").get(getVideoComments).post(VerifyJWT, addComment);
router.route("/c/:commentId").delete(VerifyJWT, deleteComment).patch(VerifyJWT, updateComment);

export default router;
