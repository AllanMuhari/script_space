import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getHighlightedBlogs,
  likeBlog,
  getBlogById,
  getMyBlogs,
  deleteMyBlog,
  editMyBlog,
} from "../controllers/blogController.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.get("/myblogs", authenticate, getMyBlogs);
router.post("/create", authenticate, createBlog);
router.get("/", getBlogs);
router.get("/:blogId", getBlogById);
router.get("/highlighted", getHighlightedBlogs);
router.post("/like/:blogId", authenticate, likeBlog);
router.delete("/:blogId", authenticate, deleteMyBlog);
router.put("/:blogId", authenticate, editMyBlog);
export default router;
