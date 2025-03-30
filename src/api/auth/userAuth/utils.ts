import {genSaltSync, hashSync } from 'bcrypt-ts';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "nbfgknbdnblsdnb";
const JWT_TOKEN_EXPIRY_MINUTES = process.env.JWT_TOKEN_EXPIRY_MINUTES || '60';

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

export {validatePhoneNumber, generateEmail, generateAccessToken, hashPassword}
