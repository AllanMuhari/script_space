import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getHighlightedBlogs,
  likeBlog,
  getBlogById,
  getMyBlogs,
  deleteMyBlog,
} from "../controllers/blogController.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.get("/myblogs", authenticate, getMyBlogs);
router.post("/create", authenticate, createBlog);
router.get("/", getBlogs);
router.get("/:blogId", getBlogById);
router.get("/highlighted", getHighlightedBlogs);
router.post("/like/:blogId", authenticate, likeBlog);
router.delete("/blog/:blogId", authenticate, deleteMyBlog);

export default router;
