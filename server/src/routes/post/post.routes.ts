import { Router } from "express";
import { uploadSingleImages } from "../../middleware/upload.midleware";
import PostController from "../../controllers/post/post.controller";

const router = Router();

router.post("/", uploadSingleImages, PostController.crreatePost);

export default router;
