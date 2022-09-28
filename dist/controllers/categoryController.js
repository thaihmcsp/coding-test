"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getOneCategory = exports.getAllCategory = void 0;
const Category_1 = require("../models/Category");
const Book_1 = require("../models/Book");
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.Category.find();
        res.status(200).json({ categories });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.getAllCategory = getAllCategory;
const getOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findOne({ _id: req.params.categoryID });
        res.status(200).json({ category });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.getOneCategory = getOneCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name } = req.body;
        const category = yield Category_1.Category.create({ Name });
        res.status(200).json({ category });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name } = req.body;
        const categoryID = req.params.categoryID;
        const category = yield Category_1.Category.findOneAndUpdate({ _id: categoryID }, { Name }, { new: true, runValidators: true });
        res.status(200).json({ category });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryID = req.params.categoryID;
        const defaultCategory = yield Category_1.Category.findOne({ Name: 'other' });
        if (categoryID == (defaultCategory === null || defaultCategory === void 0 ? void 0 : defaultCategory._id.toString()))
            return res.status(400).json({ message: 'cannot delete default category' });
        yield Book_1.Book.updateMany({ CategoryID: categoryID }, { CategoryID: defaultCategory === null || defaultCategory === void 0 ? void 0 : defaultCategory._id });
        yield Category_1.Category.deleteOne({ _id: categoryID });
        res.status(200).json({ message: 'delete success' });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.deleteCategory = deleteCategory;
