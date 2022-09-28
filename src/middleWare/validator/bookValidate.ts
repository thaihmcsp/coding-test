import Validator  from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';
const v = new Validator();

export const getOneBookValidate = (req:Request, res: Response, next: NextFunction) => {
    const schema = {
        BookID: { type: "string", length: 24 }
    }

    const check = v.compile(schema);
    const result = check({ BookID: req.params.bookID });

    if(result !== true) return res.status(400).json({result});

    next();
}

export const addBookValidate = (req:Request, res: Response, next: NextFunction) => {
    const schema = {
        Name: { type: "string", min: 3, max: 255 },
        CategoryID: { type: "string", length: 24 },
    }

    const check = v.compile(schema);
    const result = check(req.body);
    
    if(result !== true) return res.status(400).json({result});

    next();
}

export const updateBookValidate = (req:Request, res:Response, next:NextFunction) => {
    const schema = {
        Name: { type: "string", min: 3, max: 255 },
        CategoryID: { type: "string", length: 24, optional: true },
        BookID: { type: "string", length: 24 }
    }

    req.body.BookID = req.params.bookID;

    const check = v.compile(schema);
    const result = check(req.body);

    if(result !== true) return res.status(400).json({result});

    next();
}