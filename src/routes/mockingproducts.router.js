import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
const router = Router();

const controller = new ProductController();

router.post("/", controller.createMocksProducts);

export default router;
