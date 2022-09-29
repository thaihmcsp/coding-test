import mongoose from "mongoose";
import { Book } from "../models/Book";
import { Category } from "../models/Category";
import { User } from "../models/User";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const createRandomUser = async () => {
    let password = faker.internet.password();
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            Name: faker.internet.userName(),
            Email: faker.internet.email(),
            Password: hashPassword
        });
    } catch (error) {
        return error;
    }
}

const createRandomCategory = async () => {
    try {
        await Category.create({
            Name: faker.internet.userName(),
        });
    } catch (error) {
        return error;
    }
}

const createRandomBook = async () => {
    // let password = faker.internet.password();
    try {
        const countCategory = await Category.count();
        const countUser = await User.count();
        const category = await Category.findOne().skip(Math.floor(Math.random() * countCategory));
        const user = await User.findOne().skip(Math.floor(Math.random() * countUser));
        await Book.create({
            Name: faker.internet.userName(),
            CategoryID: category?._id,
            AuthorID: user?._id
        })
    } catch (error) {
        return error;
    }
}

export const createBook = async () => {
    for(let i = 0; i < 100; i++){
        await createRandomUser();
    }

    for(let i = 0; i < 10; i++){
        await createRandomCategory();
    }

    for(let i = 0; i < 10000; i++){
        createRandomBook();
    }
}