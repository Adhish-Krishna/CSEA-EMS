import { Request, Response } from "express";
import { LoginGlobalAdmin, GlobalAdminSignUp } from "./types.js";
import prisma from "../../../prisma.js";
import { checkPassword, generateEmail, hashPassword, validatePhoneNumber } from "../userAuth/utils.js";
import { generateGlobalAdminAccessToken, generateGlobalAdminRefreshToken } from "./util.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GlobalAdminPayload } from "../../../middleware/types.js";

dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const signupController = async (req: Request, res: Response): Promise<void> => {
    const globalAdmin: GlobalAdminSignUp = req.body;
    try {
        if (!globalAdmin.name || !globalAdmin.rollno || !globalAdmin.password || !globalAdmin.department || !globalAdmin.phoneno || !globalAdmin.yearofstudy) {
            res.status(400).json({
                message: "All fields are required"
            });
            return;
        }
        
        if (!validatePhoneNumber(globalAdmin.phoneno)) {
            res.status(400).json({
                message: "Phone number must contain 10 digits"
            });
            return;
        }
        
        globalAdmin.email = generateEmail(globalAdmin.rollno);
        
        // Create user with global admin flag
        const newGlobalAdmin = await prisma.users.create({
            data: {
                name: globalAdmin.name,
                rollno: globalAdmin.rollno.toLowerCase(),
                password: hashPassword(globalAdmin.password),
                department: globalAdmin.department,
                email: globalAdmin.email,
                phoneno: globalAdmin.phoneno,
                yearofstudy: globalAdmin.yearofstudy
            }
        });
        
        // Set global admin token values
        const accesstoken = generateGlobalAdminAccessToken(newGlobalAdmin.id);
        const refreshtoken = generateGlobalAdminRefreshToken(newGlobalAdmin.id);
        
        res.cookie('globaladminaccesstoken', accesstoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        
        res.cookie('globaladminrefreshtoken', refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        
        res.status(201).json({
            message: "Global admin registered successfully"
        });
        return;
    } catch (err) {
        console.error("Global admin signup error:", err);
        res.status(500).json({
            message: "Failed to register global admin"
        });
        return;
    }
}

const loginController = async (req: Request, res: Response): Promise<void> => {
    const loginCredentials: LoginGlobalAdmin = req.body;
    try {
        const userRecord = await prisma.users.findFirst({
            where: {
                rollno: loginCredentials.rollno.toLowerCase()
            }
        });
        
        if (!userRecord) {
            res.status(401).json({
                message: "User does not exist"
            });
            return;
        }
        
        // Verify password
        if (!checkPassword(userRecord.password!, loginCredentials.password)) {
            res.status(401).json({
                message: "Wrong password"
            });
            return;
        }
        
        // Generate global admin tokens
        const accesstoken = generateGlobalAdminAccessToken(userRecord.id);
        const refreshtoken = generateGlobalAdminRefreshToken(userRecord.id);
        
        res.cookie('globaladminaccesstoken', accesstoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        
        res.cookie('globaladminrefreshtoken', refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        
        res.status(200).json({
            message: "Global admin logged in successfully"
        });
        return;
    } catch (err) {
        console.error("Global admin login error:", err);
        res.status(500).json({
            message: "Login failed"
        });
        return;
    }
}

const logoutController = (req: Request, res: Response): void => {
    res.clearCookie('globaladminaccesstoken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    
    res.clearCookie('globaladminrefreshtoken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    
    res.status(200).json({
        message: "Global admin logged out successfully"
    });
    return;
}

const getNewAccessTokenController = (req: Request, res: Response): void => {
    try {
        const refreshtoken = req.cookies?.globaladminrefreshtoken;
        if (!refreshtoken) {
            res.status(401).json({
                message: "No refresh token provided"
            });
            return;
        }
        
        const payload = jwt.verify(refreshtoken, JWT_REFRESH_SECRET) as GlobalAdminPayload;
        
        if (!payload.is_global_admin) {
            res.status(403).json({
                message: "Not authorized as global admin"
            });
            return;
        }
        
        const id = payload.id;
        
        const newGlobalAdminAccessToken = generateGlobalAdminAccessToken(id);
        const newGlobalAdminRefreshToken = generateGlobalAdminRefreshToken(id);
        
        res.cookie('globaladminaccesstoken', newGlobalAdminAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        
        res.cookie('globaladminrefreshtoken', newGlobalAdminRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        
        res.status(200).json({
            message: "New global admin access token generated"
        });
        return;
    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
        return;
    }
}

export { signupController, loginController, logoutController, getNewAccessTokenController };