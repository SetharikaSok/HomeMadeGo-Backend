import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { userController } from "../controllers/user.controller";

const routes = Router();

routes.post("/", userController.authmiddleware, orderController.createOrder)
routes.get("/:id", orderController.findUniqueOrder);
routes.get("/", orderController.findAllOrder);


export default routes;