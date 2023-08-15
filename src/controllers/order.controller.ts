import { Request, Response } from "express";
import prisma from "../services/prisma";
import { CustomRequest } from "./user.controller";

export const orderController = {
    
    async createOrder(req: Request, res: Response) {
        const email = (req as CustomRequest).email
        const {totalAmount, kitchenId, menuItems} = req.body;
        
        try {
            // const timestamp = new Date().toISOString();
            // pm.environment.set('currentTimestamp', timestamp);
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            
            var order = await prisma.order.create({
                data: {
                    totalAmount: totalAmount,
                    kitchenId: kitchenId,
                    userId: user?.id,
                },
                include: {
                    orderItem: true,
                }
            });

            for (const menuItem of menuItems) {
                const {menuItemId, quantity} = menuItem;
                const orderItems = await prisma.orderItem.create({
                    data: {
                        quantity: quantity,
                        orderId: order.id,
                        menuItemId: menuItemId
                    }
                })
            }     
            
            const order2 = await prisma.order.findFirst({
                where: {
                    id: order.id
                },
                include: {
                    orderItem: true,
                }
            })
            

            return res.json({ order: order2 })
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err})
        }
    },

    async findUniqueOrder(req: Request, res: Response) {
        const paramId = req.params.id

        const uniqueOrder = await prisma.order.findUnique({
            where: {
                id: paramId
            },
            include: {
                orderItem: true,
            }
        })
        return res.json({uniqueOrder: uniqueOrder})
    },

    async findAllOrder(req: Request, res: Response) {
        const allOrder = await prisma.order.findMany({
            include: {
                orderItem: true,
            }
        });

        return res.json({order: allOrder})
    }

}