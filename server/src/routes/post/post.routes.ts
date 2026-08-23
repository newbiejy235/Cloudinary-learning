import { Router } from "express";
import { uploadSingleImages } from "../../middleware/upload.midleware";
import PostController from "../../controllers/post/post.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, uploadSingleImages, PostController.crreatePost);
router.get("/", uploadSingleImages, PostController.getAll);
router.get("/detail/:id", uploadSingleImages, PostController.detail);


export default router;
