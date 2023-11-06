import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const createToken = (id: string, email: string, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: "7d",
        
     });
    return token;
};

export const verifyToken = async (req: Request, res: Response, next:NextFunction) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}