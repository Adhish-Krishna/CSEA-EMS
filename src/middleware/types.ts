import jwt from 'jsonwebtoken';

export interface UserPayload extends jwt.JwtPayload{
    id: string;
}