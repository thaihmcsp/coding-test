import { Book } from "../models/Book";
import { Request, Response } from "express";
import { Category } from "../models/Category";
import { User } from "../models/User";

export const getAllBooks = async (req:Request, res:Response) => {
    try {
        const books = await Book.find().populate('CategoryID').populate('AuthorID');
        res.status(200).json({books});
    } catch (error) {
        console.log(error);
        res.status(500).json({error, message: 'server error'});
    }
}

export const countAllBooks = async (req:Request, res:Response) => {
    try {
        const books = await Book.count();
        res.status(200).json({books});
    } catch (error) {
        console.log(error);
        res.status(500).json({error, message: 'server error'});
    }
}

export const getOneBook = async (req:Request, res:Response) => {
    try {
        const BookID = req.params.bookID;
        const books = await Book.findOne({_id: BookID}).populate('CategoryID').populate('AuthorID');
        res.status(200).json({books});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const addBook = async (req:Request, res:Response) => {
    try {
        const {Name, CategoryID} = req.body;
        const AuthorID = req.user?._id;
        const book = await Book.create({Name, CategoryID, AuthorID})
        res.status(200).json({book});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const updateBook = async (req:Request, res:Response) => {
    try {
        const BookID = req.params.bookID;
        const {Name, CategoryID} = req.body;
        const userId = req.user?._id;

        const checkOwner = await Book.findOne({_id: BookID, AuthorID: userId});
        if(!checkOwner) return res.status(400).json({message: 'not allowed'});

        const book = await Book.findOneAndUpdate({_id: BookID}, {Name, CategoryID}, {new: true, runValidators: true});
        res.status(200).json({book, message: 'update success'});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const deleteBook = async (req:Request, res:Response) => {
    try {
        const BookID = req.params.bookID;
        const userId = req.user?._id;

        const checkOwner = await Book.findOne({_id: BookID, AuthorID: userId});
        if(!checkOwner) return res.status(400).json({message: 'not allowed'});

        await Book.deleteOne({_id: BookID});
        res.status(200).json({message: 'delete success'});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

export const getBookByAuthor = async (req:Request, res:Response) => {
    try {
        const AuthorID = req.params.userID;
        const bookGroup = await Book.aggregate([ { $match: { AuthorID: AuthorID }}, 
            { $group:{
                _id: '$CategoryID',
                books: { $push: { Name: '$Name', CategoryID: "$CategoryID", AuthorID: '$AuthorID'} }
            }}
        ])

        await Category.populate(bookGroup, {path: 'books.CategoryID'})
        res.status(200).json({bookGroup});
    } catch (error) {
        res.status(500).json({error, message: 'server error'});
    }
}

