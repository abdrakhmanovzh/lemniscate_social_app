import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost,
    createPost,
    getSinglePost,
    commentPost,
    deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/", verifyToken, getUserPosts);
router.get("/single/:postId/", verifyToken, getSinglePost);

/* POST */
router.post("/", verifyToken, createPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

/*DELETE */
router.delete("/:id", verifyToken, deletePost);

export default router;
