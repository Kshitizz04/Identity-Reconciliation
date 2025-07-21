import { NextFunction, Request, Response } from "express";

export const tempRoute = async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.send({ message: 'Temporary route for testing purposes' });
    }catch(err){
        next(err);
    }
}