import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {AdminPayload, UserPayload} from "./types.js";
import {get_club_id} from "../api/event/utils.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

const userAuthMiddleware = (req: Request, res: Response, next: NextFunction): void =>{
    try{
        const token = req.cookies?.accesstoken;
        if(!token){
            res.status(401).json({
                message: "No token provided"
            })
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
        req.user_id = decoded.id;
        next();
    }
    catch(err){
        res.status(401).json({
            message: 'Invalid Token'
        })
        return;
    }
}

const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void =>{
    try{
        const token = req.cookies?.adminaccesstoken;
        console.log("auth triggered")
        if(!token){
            res.status(401).json({
                message: "No token provided"
            });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
        req.admin_user_id = decoded.id;
        req.admin_club_id = decoded.club_id;
        let {club_id,event_id}=req.body;
        if(!club_id && !event_id){
            res.status(401).json({
                message:"Requires club_id or event_id"
            });
            return;
        }
        if(!club_id && event_id){
            club_id = get_club_id(event_id); 
        }
        if(decoded.club_id !== club_id){
            res.status(401).json({
                message: "You cannot access this club"
            });
            return;
        }
        next();
    }
    catch(err){
        res.status(401).json({
            message: "Invalid Token"
        });
    }
}

export {userAuthMiddleware, adminAuthMiddleware}