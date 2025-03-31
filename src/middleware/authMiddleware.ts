import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationRequest, UserPayload } from "./types.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "nbfgknbdnblsdnb";

const authMiddleware = (req: AuthenticationRequest, res: Response, next: NextFunction)=>{
    try{
        const token = req.cookies?.accesstoken;
        if(!token){
            return res.status(401).json({
                message: "No token provided"
            })
        }
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
        req.user_id = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }
}

export {authMiddleware}