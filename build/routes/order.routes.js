"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var order_controller_1 = require("../controllers/order.controller");
var user_controller_1 = require("../controllers/user.controller");
var routes = (0, express_1.Router)();
routes.post("/", user_controller_1.userController.authmiddleware, order_controller_1.orderController.createOrder);
routes.get("/:id", order_controller_1.orderController.findUniqueOrder);
routes.get("/", order_controller_1.orderController.findAllOrder);
exports.default = routes;
//# sourceMappingURL=order.routes.js.map