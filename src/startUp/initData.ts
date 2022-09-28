import { Category } from "../models/Category";

export async function defaultCategory() {
    try {
        const check = await Category.findOne({Name: 'other'});
        if(check) return;
        
        await Category.create({Name: 'other'});
    } catch (error) {
        console.log(error);
    }
}