import indexRoute from './indexRoute';
import { Express } from 'express';
import { defaultCategory } from './initData';

export const startUp = async(app:Express) => {
    try {
        app.use('/', indexRoute);
        await defaultCategory();
    } catch (error) {
        console.log(error);
    }
}