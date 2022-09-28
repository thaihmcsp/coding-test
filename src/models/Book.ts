import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    Name: {type: String, required: true, unique: true},
    CategoryID: {type: String, ref: 'category', required: true},
    AuthorID: {type: String, ref: 'user', required: true}
}, {collection: 'book', timestamps: true});

export const Book = mongoose.model('book', BookSchema);