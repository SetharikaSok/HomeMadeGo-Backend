"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var menuItem_controller_1 = require("../controllers/menuItem.controller");
var user_controller_1 = require("../controllers/user.controller");
var multer_1 = __importDefault(require("multer"));
//multer setup
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
var routes = (0, express_1.Router)();
routes.post("/", upload.single('file'), user_controller_1.userController.authmiddleware, menuItem_controller_1.menuItemController.createMenuItem);
routes.get("/:id", menuItem_controller_1.menuItemController.findUniqueMenuItem);
routes.get("/", menuItem_controller_1.menuItemController.findAllMenuItems);
routes.delete("/:id", menuItem_controller_1.menuItemController.deleteItem);
// routes.get("/image", )
exports.default = routes;
