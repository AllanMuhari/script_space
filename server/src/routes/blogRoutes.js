import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getHighlightedBlogs,
  likeBlog,
} from "../controllers/blogController.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.post("/create", authenticate, createBlog);
router.get("/", getBlogs);
router.get("/highlighted", getHighlightedBlogs);
router.post("/like/:blogId", authenticate, likeBlog);

export default router;
