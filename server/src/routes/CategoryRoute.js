import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", getCategory);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategory);

export default router;
