import { User } from "../models/User";
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
dotenv.config();
const salt = process.env.BCRYPT_SALT;
const secret = process.env.JWT_SECRET;
const expire = process.env.JWT_EXPIRE;

export const createUser = async (req:Request, res:Response) => {
    try {
        const { Name, Password, Email} = req.body;
        let hashPassword;
        if(salt) hashPassword = await bcrypt.hash(Password, bcrypt.genSaltSync(parseInt(salt)));

        await User.create({Name, Email, Password: hashPassword});
        res.status(200).json({message: 'create user success'});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const signIn = async (req:Request, res: Response) => {
    try {
        const {Email, Password} = req.body;
        const user = await User.findOne({Email});
        if(!user) return res.status(400).json({message: 'wrong email'});

        const checkPassword = await bcrypt.compare(Password, user.Password);
        if(!checkPassword) return res.status(400).json({message: 'wrong password'});

        let token;
        if(secret) token = jwt.sign({Email, _id: user._id, Role: user.Role}, secret, {expiresIn: expire});
        await User.updateOne({_id: user._id}, {Token: token});
        res.status(200).json({message: 'login success', token});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const getMe = async (req:Request, res: Response) => {
    try {
        res.status(200).json({user: req.user})
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}