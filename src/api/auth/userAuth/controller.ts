import {Request, Response} from 'express'
import { SignUpUser, LoginUser } from './types';
import prisma from '../../../prisma.js';
import { validatePhoneNumber, generateEmail, generateAccessToken, hashPassword, checkPassword, generateSecurityCode, generateRefreshToken } from './utils.js';
import { sendSecurityCodeEmail } from '../../../mailer/sendMail.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserPayload } from '../../../middleware/types';

dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const signupController = async (req: Request, res: Response): Promise<void> =>{
    const user: SignUpUser = req.body;
    try{
        if(!user.name || !user.rollno || !user.password || !user.department || !user.phoneno || !user.yearofstudy){
            res.status(400).json({
                message: "Require all fields"
            })
            return;
        }
        if(!validatePhoneNumber(user.phoneno)){
            res.status(400).json({
                message: "Phone number must contain 10 digits"
            })
            return;
        }
        user.email = generateEmail(user.rollno);
        const new_user = await prisma.users.create({
            data: {
                name : user.name,
                rollno: user.rollno.toLowerCase(),
                password: hashPassword(user.password),
                department: user.department,
                email: user.email,
                phoneno: user.phoneno,
                yearofstudy: user.yearofstudy
            }
        })
        const accesstoken = generateAccessToken(new_user.id);
        const refreshtoken = generateRefreshToken(new_user.id);
        res.cookie('accesstoken', accesstoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(201).json({
            message: "User signed up successfully",
        });
        return;
    }
    catch(err){
        res.status(500).json({
            message: err
        })
        return;
    }
}

const loginController = async (req: Request, res: Response): Promise<void> =>{
    const user: LoginUser = req.body;
    try{
        const users = await prisma.users.findFirst({
            where: {
                rollno: user.rollno.toLowerCase()
            }
        })
        if(!users){
            res.status(401).json({
                message: "User does not exists"
            })
            return;
        }
        if(!checkPassword(users.password!, user.password)){
            res.status(401).json({
                message: "Wrong password"
            })
            return;
        }
        const accesstoken = generateAccessToken(users.id);
        const refreshtoken = generateRefreshToken(users.id);
        res.cookie('accesstoken', accesstoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(200).json({
            message: "User logged in successfully"
        })
        return;
    }
    catch(err){
        res.status(500).json({
            message: err
        })
        return;
    }
}

const logoutController = (req: Request, res: Response): void =>{
    res.clearCookie('accesstoken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    res.clearCookie('refreshtoken',{
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    res.status(200).json({
        message: "User logged out successfully"
    });
    return;
}

const generateSecurityCodeController = async (req: Request, res: Response): Promise<void> =>{
    const {rollno} = req.body;
    try{
        const user = await prisma.users.findFirst({
            where:{
                rollno: rollno.toLowerCase()
            }
        });
        if(!user){
            res.status(401).json({
                message: "User does not exist"
            })
            return;
        }
        const user_id = user.id;
        const code = generateSecurityCode();
        const userSecurityRecord = await prisma.usersecuritycode.findFirst({
            where:{
                user_id: user_id
            }
        });
        if(!userSecurityRecord){
            const newSecurityRecord = await prisma.usersecuritycode.create({
                data:{
                    user_id: user_id,
                    code: code
                }
            });
        }
        else{
            await prisma.usersecuritycode.update({
                where:{
                    user_id: user_id
                },
                data:{
                    code: code
                }
            });
        }
        const user_email = user.email;
        sendSecurityCodeEmail(user_email!, code);
        res.status(200).json({
            message: "Security Code Created"
        });
        return;
    }
    catch(err){
        res.status(500).json({
            message: err
        });
        return;
    }
}

const verifySecurityCodeController = async (req: Request, res: Response): Promise<void> =>{
    const {rollno, code} = req.body;
    const userRecord = await prisma.users.findFirst({
        where: {
            rollno: rollno.toLowerCase()
        }
    });
    if(!userRecord){
        res.status(401).json({
            message: "User does not exists"
        });
        return;
    }
    const user_id = userRecord.id;
    const securityRecord = await prisma.usersecuritycode.findFirst({
        where:{
            user_id: user_id
        }
    });
    if(!securityRecord){
        res.status(401).json({
            message: "Security code not found"
        });
        return;
    }
    if(code === securityRecord?.code){
        res.status(200).json({
            message: "Security Codes matched"
        });
        return;
    }
    else{
        res.status(400).json({
            message: "Security codes not matched"
        });
        return;
    }
}

const resetpasswordController = async (req: Request, res: Response): Promise<void> =>{
    const {rollno, password} = req.body;
    try{
        const userRecord = await prisma.users.findFirst({
            where: {
                rollno: rollno.toLowerCase()
            }
        });
        if(!userRecord){
            res.status(401).json({
                message: "User does not exists"
            });
            return;
        }
        const user_id = userRecord.id;
        const hashpassword = hashPassword(password);
        await prisma.users.update({
            where:{
                id: user_id
            },
            data:{
                password: hashpassword
            }
        });
        res.status(200).json({
            message: "Password reset successfully"
        });
        return;

    }
    catch(err){
        res.status(500).json({
            message: err
        });
        return;
    }
}

const getNewAccessTokenController = (req: Request, res: Response): void =>{
    try{
        const refreshtoken = req.cookies.refreshtoken;
        const payload = jwt.verify(refreshtoken, JWT_REFRESH_SECRET) as UserPayload;
        const user_id = payload.id;
        const accesstoken = generateAccessToken(user_id);
        const newrefreshtoken = generateRefreshToken(user_id);
        res.cookie('accesstoken', accesstoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.cookie('refreshtoken', newrefreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(200).json({
            message: "New access token generated",
        });
        return;
    }
    catch(err){
        res.status(401).json({
            message: err
        });
        return;
    }
}

export {signupController, loginController, logoutController, generateSecurityCodeController, verifySecurityCodeController, resetpasswordController, getNewAccessTokenController};