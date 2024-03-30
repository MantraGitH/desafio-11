import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";

const router = Router();
const controller = new ViewsController();

router.get("/", controller.login);
router.get("/register", controller.register);
router.get("/profile", controller.profile);
router.get("/errorRegister", controller.errorRegister);
router.get("/errorLogin", controller.errorLogin);

export default router;
