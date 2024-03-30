import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import cartRouter from "./cart.router.js";
import ticketrouter from "./ticket.router.js";
import mockingproducts from "./mockingproducts.router.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use("/products", productRouter);
    this.router.use("/users", userRouter);
    this.router.use("/carts", cartRouter);
    this.router.use("/tickets", ticketrouter);
    this.router.use("/mockingproducts", mockingproducts);
  }

  getRouter() {
    return this.router;
  }
}
