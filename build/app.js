"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var cors_1 = __importDefault(require("cors"));
// import multer from 'multer';
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.server.use(express_1.default.json());
        this.server.use((0, cors_1.default)());
        // for parsing multipart/form-data
        //this.server.use(upload.array()); 
    };
    App.prototype.routes = function () {
        this.server.use("/auth", routes_1.userRoutes);
        this.server.use("/kitchen", routes_1.kitchenRoutes);
        this.server.use("/menuItem", routes_1.menuItemRoutes);
        this.server.use("/order", routes_1.orderRoutes);
    };
    return App;
}());
exports.default = new App().server;
