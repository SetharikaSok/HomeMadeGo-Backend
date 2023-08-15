import { NextFunction, Request, Response } from "express";
import prisma from "../services/prisma";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';


const JWT_KEY = "mykey123";

export interface CustomRequest extends Request {
    email: string;
}

export const userController = {
    async authmiddleware(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header('token');
            if (!token) return res.status(401).json({"msg": "No auth token. Access denied."});
    
            const verified = jwt.verify(token, JWT_KEY) as JwtPayload;
            if (!verified) {
                return res.status(401).json({"msg": "Token verification failed."});
            }

            (req as CustomRequest).email = verified.email;
            
            next();
        } catch (e) {
            res.status(500).json({"msg": "error token"});
        }
    },

    async createUser(req: Request, res: Response) {
        const {fname, lname, email, password, address, usertype} = req.body;
        const hash_password = await bcrypt.hash(password, 12);
        const webtoken = jwt.sign({"email": email}, JWT_KEY);
        const user = await prisma.user.create({
            data: {
                fname: fname,
                lname: lname,
                email: email,
                password: hash_password,
                webtoken: webtoken,
                address: address,
            },
            include: {
                orders: true
            }
        });

        // do not show hashpassword
        user.password = ""

        return res.json({ user:user })
    },

    async loginUser(req: Request, res: Response) {
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (user && bcrypt.compareSync(password, user.password)) {
            user.password = ""
            return res.json(user);
        }
        
        return res.status(400).json({"error_message": "Email or Password didn't match"})
    },

    async dashboard(req: Request, res: Response) {
        const email = (req as CustomRequest).email
        

    },

    async index(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json(users);
    },

    async findUniqueUser(req: Request, res: Response) {
        const paramId = req.params.id;

        const uniqueUser = await prisma.user.findUnique({
            where: {
                id: paramId,
            }
        });

        return res.json({ uniqueUser: uniqueUser });
    },

    async updateUser(req: Request, res: Response) {
        const paramId = req.params.id;
        const address = req.body.address;

        const updateUser = await prisma.user.update({
            data: {
                address: address,
            },
            where: {
                id: paramId,
            }
        });

        return res.json({ updateUser: updateUser });
    },

    async deleteUser(req: Request, res: Response) {
        const paramId = req.params.id;

        const deletedUser = await prisma.user.delete({
            where: {
                id: paramId,
            }
        }); 

        return res.json({ deletedUser: deletedUser });
    }
};