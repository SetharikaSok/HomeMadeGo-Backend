"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var routes = (0, express_1.Router)();
routes.post("/login", user_controller_1.userController.loginUser);
routes.get("/", user_controller_1.userController.index);
routes.get("/dashboard", user_controller_1.userController.authmiddleware, user_controller_1.userController.dashboard);
routes.post("/", user_controller_1.userController.createUser);
routes.get("/:id", user_controller_1.userController.findUniqueUser);
routes.put("/:id", user_controller_1.userController.updateUser);
routes.delete("/:id", user_controller_1.userController.deleteUser);
exports.default = routes;
//# sourceMappingURL=user.routes.js.map