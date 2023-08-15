"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var location_controller_1 = require("../controllers/location.controller");
var routes = (0, express_1.Router)();
routes.get("/", location_controller_1.locationController.getLocation);
exports.default = routes;
//# sourceMappingURL=location.routes.js.map