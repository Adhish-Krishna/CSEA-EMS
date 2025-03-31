import {Request, Response} from 'express'
import { SignUpUser, LoginUser } from './types';
import prisma from '../../../prisma.js';
import { validatePhoneNumber, generateEmail, generateAccessToken, hashPassword, checkPassword } from './utils.js';

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
                name: user.name
            }
        })
        if(!users){
            res.status(401).json({
                message: "User does not exists"
            })
            return;
        }
        if(!checkPassword(users.password, user.password)){
            res.status(401).json({
                message: "Wrong password"
            })
            return;
        }
        const token = generateAccessToken(users.id);
        res.cookie('accesstoken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
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

export {signupController, loginController};