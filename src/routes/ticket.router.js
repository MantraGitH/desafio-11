import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const controller = new TicketController();
const router = Router();

router.post("/cart/:cartId", verifyToken, controller.generateTicket);

export default router;
