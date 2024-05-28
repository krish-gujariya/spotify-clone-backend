import { Request, Response } from "express";
import { logger } from "../utils/pino";

const homePage = (req:Request, res:Response)=>{
    try {
        res.render("home");
    } catch (error) {
        logger.error(error)        
    }
}


export {homePage}