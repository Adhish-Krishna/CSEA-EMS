import {genSaltSync, hashSync, compareSync } from 'bcrypt-ts';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_TOKEN_EXPIRY_MINUTES = process.env.JWT_TOKEN_EXPIRY_MINUTES!;

//signup util

const validatePhoneNumber = (phoneno: bigint)=>{
    if(phoneno.toString().length == 10){
        return true;
    }
    return false;
}

const generateEmail = (rollno: string)=>{
    let email = rollno.toLowerCase().trimEnd().concat("@psgtech.ac.in");
    return email;
}

const hashPassword = (password: string)=>{
    const salt = genSaltSync(10);
    const hashpassword = hashSync(password, salt);
    return hashpassword
}

const generateAccessToken = (id: number)=>{
    const token = jwt.sign(
        {
            id: id
        },
        JWT_SECRET,
        {
            expiresIn: 60*parseInt(JWT_TOKEN_EXPIRY_MINUTES)
        }
    );
    return token;
}

//login util

const checkPassword = (hashpassword: string, password: string)=>{
    return compareSync(password, hashpassword);
}

export {validatePhoneNumber, generateEmail, generateAccessToken, hashPassword, checkPassword}
