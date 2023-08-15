import express, { Request } from "express";
import { kitchenRoutes, locationRoutes, menuItemRoutes, orderRoutes, userRoutes } from "./routes";
import cors from "cors";
// import multer from 'multer';
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors<Request>());
        // for parsing multipart/form-data
        //this.server.use(upload.array()); 
    }

    routes() {
        this.server.use("/auth", userRoutes);
        this.server.use("/kitchen", kitchenRoutes);
        this.server.use("/menuItem", menuItemRoutes);
        this.server.use("/order", orderRoutes);
        this.server.use("/location", locationRoutes);
    }

    
    
}

export default new App().server;