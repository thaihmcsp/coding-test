"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BookSchema = new Schema({
    Name: { type: String, required: true, unique: true },
    CategoryID: { type: String, ref: 'category', required: true },
    AuthorID: { type: String, ref: 'user', required: true }
}, { collection: 'book', timestamps: true });
exports.Book = mongoose_1.default.model('book', BookSchema);
