import express, { Express } from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { createBook } from './seed.js';
dotenv.config();

const app: Express = express();
const port = 3001
const dbName = process.env.DB_NAME;

createBook();

app.listen(port, async () => {
    await mongoose.connect(`mongodb://localhost/${dbName}`);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    console.log('mongoDB connected');
});