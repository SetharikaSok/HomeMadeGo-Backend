"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var kitchen_controller_1 = require("../controllers/kitchen.controller");
var user_controller_1 = require("../controllers/user.controller");
var multer_1 = __importDefault(require("multer"));
//multer setup
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
var routes = (0, express_1.Router)();
routes.post("/", upload.single('file'), user_controller_1.userController.authmiddleware, kitchen_controller_1.kitchenController.createKitchen);
routes.get("/:id", kitchen_controller_1.kitchenController.findUniqueKitchen);
routes.get("/", kitchen_controller_1.kitchenController.findAllKitchens);
routes.delete("/:id", kitchen_controller_1.kitchenController.deleteKitchen);
// This route use tp emty the contenct of all table in database.
routes.delete("/", kitchen_controller_1.kitchenController.deleteAll);
exports.default = routes;
//# sourceMappingURL=kitchen.routes.js.map