import Validator  from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';
const v = new Validator();

export const changePasswordValidate = async (req:Request, res: Response, next: NextFunction) => {
    const schema = {
        Password: { type: "string", min: 3, max: 255 },
        currentPassword: { type: "string", min: 3, max: 255 },
    }

    const check = v.compile(schema);
    const result = check(req.body);
    
    if(result !== true) return res.status(400).json({result});

    next();
}

export const getOneUserValidate = (req:Request, res:Response, next:NextFunction) => {
    const schema = {
        userID: { type: "string", length: 24 },
    }

    const check = v.compile(schema);
    const result = check(req.params);
    
    if(result !== true) return res.status(400).json({result});

    next();
}

export const changeInfoValidate = (req:Request, res:Response, next:NextFunction) => {
    const schema = {
        Name: { type: "string", min: 3, max: 255 },
    }

    const check = v.compile(schema);
    const result = check(req.body);
    
    if(result !== true) return res.status(400).json({result});

    next();
}