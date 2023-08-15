"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRoutes = exports.orderRoutes = exports.menuItemRoutes = exports.kitchenRoutes = exports.userRoutes = void 0;
var user_routes_1 = __importDefault(require("./user.routes"));
exports.userRoutes = user_routes_1.default;
var kitchen_routes_1 = __importDefault(require("./kitchen.routes"));
exports.kitchenRoutes = kitchen_routes_1.default;
var menuItem_routes_1 = __importDefault(require("./menuItem.routes"));
exports.menuItemRoutes = menuItem_routes_1.default;
var order_routes_1 = __importDefault(require("./order.routes"));
exports.orderRoutes = order_routes_1.default;
var location_routes_1 = __importDefault(require("./location.routes"));
exports.locationRoutes = location_routes_1.default;
//# sourceMappingURL=index.js.map