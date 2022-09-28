import mongoose from "mongoose";
import { Book } from "../models/Book";
import { Category } from "../models/Category";
import { User } from "../models/User";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

mongoose.connect(`mongodb://localhost/bookApp`);

const createRandomUser = async () => {
    let password = faker.internet.password();
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        return {
            Name: faker.internet.userName(),
            Email: faker.internet.email(),
            Password: hashPassword
        };
    } catch (error) {
        return error;
    }
}
const createRandomBook = async () => {
    // let password = faker.internet.password();
    try {
        const category = await Category.findOne();
        const user = await User.findOne();
        await Book.create({
            Name: faker.internet.userName(),
            CategoryID: category?._id,
            AuthorID: user?._id
        })
    } catch (error) {
        return error;
    }
}

export const createBook = () => {
    for(let i = 0; i < 1000; i++){
        createRandomBook()
    }
}