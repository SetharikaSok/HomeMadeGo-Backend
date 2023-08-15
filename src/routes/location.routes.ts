import { Router } from "express";
import { locationController } from "../controllers/location.controller";


const routes = Router();

routes.get("/", locationController.getLocation)

export default routes;