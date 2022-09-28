import Validator  from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';
const v = new Validator();

export const categoryValidate = async (req:Request, res: Response, next: NextFunction) => {
    const schema = {
        Name: { type: "string", min: 3, max: 255 },
    }

    const check = v.compile(schema);
    const result = check(req.body);
    
    if(result !== true) return res.status(400).json({result});

    next();
}