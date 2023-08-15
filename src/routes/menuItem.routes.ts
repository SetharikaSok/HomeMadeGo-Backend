import { Router } from "express";
import { menuItemController } from "../controllers/menuItem.controller";
import { userController } from "../controllers/user.controller";
import multer from 'multer';

//multer setup
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const routes = Router();

routes.post("/", upload.single('file'), userController.authmiddleware, menuItemController.createMenuItem)
routes.get("/:id", menuItemController.findUniqueMenuItem);
routes.get("/kitchen/:kitchenId", menuItemController.findAllMenuItems);
routes.delete("/:id", menuItemController.deleteItem);
// routes.get("/image", )

export default routes;