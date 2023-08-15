import prisma from "../services/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "./user.controller";
import { imageController } from "./image.controller";


export const menuItemController = {

    async createMenuItem(req: Request, res: Response) {
        const email = (req as CustomRequest).email
        
        //file
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        
        const {name, description, price, category} = req.body;

        const kitchen = await prisma.kitchen.findUnique({
            where: {
                email: email
            }
        })

        const image_location = await imageController.upload(req.file);
        
        if (kitchen) {
            const menuItem = await prisma.menuItem.create({
                data: {
                    name: name,
                    description: description,
                    price: parseFloat(price+""),
                    category: category,
                    kitchenId: kitchen?.id,
                    imgUrl: image_location
                },
                include: {
                    kitchen: true,
                    orderItem: true,
                }
            });
            return res.json({ menuItem: menuItem }) 
        }
        else {
            return res.status(404).json({"message": "MenuItem not found"})
        }
    },

    async findUniqueMenuItem(req: Request, res: Response) {
        const paramId = req.params.id;

        const uniqueMenuItem = await prisma.menuItem.findUnique({
            where: {
                id: paramId,
            }
        });
        // console.log('menuId:', paramId)

        return res.json({ uniqueMenuItem: uniqueMenuItem });
    },

    async findAllMenuItems(req: Request, res: Response) {
        const paramId = req.params.kitchenId;
        const  menuItems = await prisma. menuItem.findMany({
            where: {
                kitchenId: paramId
            }
        })
        console.log('kitchenId:', paramId)
        return res.json( menuItems);
    },

    async deleteItem(req: Request, res: Response) {
        const paramId = req.params.id;

        const deletedItem = await prisma.menuItem.delete({
            where: {
                id: paramId,
            }
        }); 

        return res.json({ deletedItem: deletedItem });
    }
    // async readImage(req: Request, res: Response) {
    //     const paramsGetObject = {
    //         Bucket: bucketName,
    //         Key: req.file.originalname,
    //       };

    //     // const getresponse = await s3.getSignedUrlPromise("getObject", paramsGetObject)
        
    //     const data1 = await s3.getObject(paramsGetObject).promise();

    //     return res.status

    // }
}