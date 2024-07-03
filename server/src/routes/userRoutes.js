import { Router } from "express";
import { uploadUserImage } from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post(
  "/upload-image",
  authenticate,
  upload.single("image"),
  uploadUserImage
);

export default router;
