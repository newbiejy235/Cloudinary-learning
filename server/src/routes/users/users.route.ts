import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import usersConttroller from "../../controllers/users/users.conttroller";

const router = Router()

router.get('/:userId', authenticate, usersConttroller.getPostByUserId )
router.get('/:userId/posts/:postId', authenticate, usersConttroller.getUserPost )

export default router