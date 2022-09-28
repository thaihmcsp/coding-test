import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET;

interface TokenPayload {
    Email: string;
    _id: string;
}

export const checkToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if(!token || !secret) return res.status(400).json({message: 'not loged in'});

        const data = jwt.verify(token, secret) as TokenPayload;
        const user = await User.findOne({_id: data._id, Token: token}).select(['-Token', '-Password']);
        
        if(!user) return res.status(400).json({message: 'not authorized'});
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({message: 'not authorized'})
    }
}

export const checkAdmin = async (req:Request, res:Response, next:NextFunction) => {
    if(req.user && req.user.Role !== 'admin') return res.status(400).json({message: 'not allowed'});

    next()
}