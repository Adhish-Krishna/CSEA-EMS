import jwt from 'jsonwebtoken';
import {Request} from 'express';

export interface AuthenticationRequest extends Request{
    user_id: UserPayload
}

export interface UserPayload extends jwt.JwtPayload{
    id: string;
}