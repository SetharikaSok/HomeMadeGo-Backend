import prisma from "../services/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "./user.controller";
import { imageController } from "./image.controller";

export const kitchenController = {

    async createKitchen(req: Request, res: Response) {
        const email = (req as CustomRequest).email
        const {name, address1, address2, city, state, country, zipcode, latitude, longitude, contact, cuisineType, imgUrl} = req.body; 

        // find lat/lon of created kitchen
        //file
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const image_location = await imageController.upload(req.file);

        if (email) {
            const kitchen = await prisma.kitchen.create({
                data: {
                    name: name,
                    address1: address1, //30022
                    address2: address2,
                    city: city,
                    state: state,
                    country:country,
                    zipcode: zipcode,
                    latitude: latitude,
                    longitude: longitude,
                    contactNumber: contact,
                    cuisineType: cuisineType,
                    email: email,
                    imgUrl: image_location
                },
                include: {
                    menuItems: true,
                    orders: true
                }
            });
    
            return res.json({ kitchen:kitchen })
        }
        else {
            return res.status(404).json({"message": "Kitchen not found"})
        }
    },

    async findUniqueKitchen(req: Request, res: Response) {
        const paramId = req.params.id;

        const uniqueKitchen = await prisma.kitchen.findUnique({
            where: {
                id: paramId,
            }
        });

        return res.json({ uniqueKitchen: uniqueKitchen });
    },

    async findAllKitchens(req: Request, res: Response) {
        const kitchens = await prisma.kitchen.findMany();
        return res.json(kitchens);
    },

    async deleteKitchen(req: Request, res: Response) {
        const paramId = req.params.id;

        const deletedKitchen = await prisma.kitchen.delete({
            where: {
                id: paramId,
            }
        }); 

        return res.json({ deletedKitchen: deletedKitchen });
    },

    async deleteAll(req: Request, res: Response) {

        //const deletedkitchen = await prisma.kitchen.deleteMany();
        // const deletedUser = await prisma.user.deleteMany();
        // const deletedMenuItem = await prisma.menuItem.deleteMany();
        // const deletedOrder = await prisma.order.deleteMany();

        const tableNames = ['Kitchen', 'MenuItem', 'User', 'Order', 'OrderItem'];

        for (const tableName of tableNames) 
            await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
        

        return res.json({ deletedAll: "" });
    }

    
}