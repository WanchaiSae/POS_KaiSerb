import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductId,
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/", getProduct);
router.get("/:id", getProductId);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

export default router;
