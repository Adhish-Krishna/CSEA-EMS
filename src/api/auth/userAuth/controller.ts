import {Request, Response} from 'express'
import { User } from './types';
import prisma from '../../../prisma.js';
import { validatePhoneNumber, generateEmail, generateAccessToken, hashPassword } from './utils.js';

const signupController = async (req: Request, res: Response)=>{
    const user: User = req.body;
    try{
        if(!user.name || !user.rollno || !user.password || !user.department || !user.phoneno || !user.yearofstudy){
            return res.status(400).json({
                error: "Require all fields"
            })
        }
        if(!validatePhoneNumber(user.phoneno)){
            return res.status(400).json({
                error: "Phone number must contain 10 digits"
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
        return res.status(201).json({
            message: "User signed up successfully",
            token: generateAccessToken(new_user.id),
        });
    }
    catch(err){
        return res.status(500).json({
            error: err
        })
    }
}

export {signupController};