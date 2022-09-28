import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    Name: {type: String, required: true},
}, {collection: 'category', timestamps: true});

export const Category = mongoose.model('category', CategorySchema);