import { User } from "../models/User";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Book } from "../models/Book";
dotenv.config();
const salt = process.env.BCRYPT_SALT;

export const getAllUsers = async (req:Request, res:Response) => {
    try {
        const users = await User.find().select(['-Password', '-Token']);
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

export const getOneUser = async (req:Request, res:Response) => {
    try {
        const user = await User.findById(req.params.userID).select(['-Password', '-Token']);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

export const changePassword = async (req:Request, res:Response) => {
    try {
        const {Password, currentPassword} = req.body;
        const userID = req.user?._id;
        const user = await User.findById(userID);

        if(!user) return res.status(400).json({message: 'not allowed'});
        const checkPassword = await bcrypt.compare(currentPassword, user?.Password);

        if(!checkPassword) return res.status(400).json({message: 'wrong password'});

        let hashPassword;
        if(salt) hashPassword = await bcrypt.hash(Password, bcrypt.genSaltSync(parseInt(salt)));
        await User.updateOne({_id: userID}, {Password: hashPassword, Token: ''});
        res.status(200).json({message: 'change password success, please login again with new password'});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

export const deleteUser = async (req:Request, res:Response) => {
    try {
        await Book.deleteMany({AuthorID: req.params.userID});
        await User.deleteOne({_id: req.params.userID});
        res.status(200).json({message: 'deleted author and book'});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}

export const changeUserInfo = async (req:Request, res:Response) => {
    try {
        await User.updateOne({_id: req.user?._id}, {Name: req.body.Name});
        res.status(200).json({message: 'update success'});
    } catch (error) {
        res.status(500).json({message: 'server error', error});
    }
}