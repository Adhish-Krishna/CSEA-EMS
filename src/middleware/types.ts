import jwt from 'jsonwebtoken';

export interface UserPayload extends jwt.JwtPayload{
    id: string;
}
declare global {
    namespace Express {
        interface Request  {
            user_id: number;
        }
    }
}