import {Request, Response} from 'express'
import { SignUpUser, LoginUser } from './types';
import prisma from '../../../prisma.js';
import { validatePhoneNumber, generateEmail, generateAccessToken, hashPassword, checkPassword } from './utils.js';

const signupController = async (req: Request, res: Response)=>{
    const user: SignUpUser = req.body;
    try{
        if(!user.name || !user.rollno || !user.password || !user.department || !user.phoneno || !user.yearofstudy){
            return res.status(400).json({
                message: "Require all fields"
            })
        }
        if(!validatePhoneNumber(user.phoneno)){
            return res.status(400).json({
                message: "Phone number must contain 10 digits"
            })
        }
        user.email = generateEmail(user.rollno);
        const new_user = await prisma.users.create({
            data: {
                name : user.name,
                rollno: user.rollno,
                password: hashPassword(user.password),
                department: user.department,
                email: user.email,
                phoneno: user.phoneno,
                yearofstudy: user.yearofstudy
            }
        })
        const token = generateAccessToken(new_user.id);
        res.cookie('accesstoken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        return res.status(201).json({
            message: "User signed up successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

const loginController = async (req: Request, res: Response)=>{
    const user: LoginUser = req.body;
    try{
        const users = await prisma.users.findFirst({
            where: {
                name: user.name
            }
        })
        if(!users){
            return res.status(401).json({
                message: "User does not exists"
            })
        }
        if(!checkPassword(users.password, user.password)){
            return res.status(401).json({
                message: "Wrong password"
            })
        }
        const token = generateAccessToken(users.id);
        res.cookie('accesstoken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        return res.status(200).json({
            message: "User logged in successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

export {signupController, loginController};