import { Category } from "../models/Category";
import { Request, Response } from "express";
import { Book } from "../models/Book";

export const getAllCategory = async (req:Request, res:Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json({categories});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const getOneCategory = async (req:Request, res:Response) => {
    try {
        const category = await Category.findOne({_id: req.params.categoryID});
        res.status(200).json({category});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const createCategory = async (req:Request, res:Response) => {
    try {
        const {Name} = req.body;
        const category = await Category.create({Name});
        res.status(200).json({category});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const updateCategory = async (req:Request, res:Response) => {
    try {
        const {Name} = req.body;
        const categoryID = req.params.categoryID;
        const category = await Category.findOneAndUpdate({_id: categoryID}, {Name}, {new: true, runValidators: true});
        res.status(200).json({category});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const deleteCategory = async (req:Request, res:Response) => {
    try {
        const categoryID = req.params.categoryID;

        const defaultCategory = await Category.findOne({Name: 'other'});
        if(categoryID == defaultCategory?._id.toString()) return res.status(400).json({message: 'cannot delete default category'});

        await Book.updateMany({CategoryID: categoryID}, {CategoryID: defaultCategory?._id});
        await Category.deleteOne({_id: categoryID});

        res.status(200).json({message: 'delete success'});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}