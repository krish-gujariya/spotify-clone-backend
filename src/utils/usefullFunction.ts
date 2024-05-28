import bcrypt from "bcrypt";
import { Response } from "express";
import { IResponseFormat } from "../types/coreModuleExtendedInterface";

// Function for generate hash password
const genPassword = async(passString:string)=>{
    return await bcrypt.hash(passString,10);
}


// Function for send common response.json formate

const commonResJson = (res:Response, message:string, flag:boolean):Response<IResponseFormat> =>{

    return res.json({message:message, success:flag})

}


export {genPassword, commonResJson};