import express from "express";
import { getUser, getUsers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getUsers);

export default router;
