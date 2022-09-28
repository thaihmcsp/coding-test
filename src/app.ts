import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import { createBook } from './dev/seed.js';
import { startUp } from './startUp/index.js';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const dbName = process.env.DB_NAME;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
createBook();

startUp(app);

app.listen(port, async () => {
    await mongoose.connect(`mongodb://localhost/${dbName}`);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    console.log('mongoDB connected');
});