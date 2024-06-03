import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import { IResponseFormat } from "../types/coreModuleExtendedInterface";
import Joi from "joi";

// Function for generate hash password
const genPassword = async (passString: string) => {
  return await bcrypt.hash(passString, 10);
};

// Function for send common response.json formate

const commonResJson = (
  res: Response,
  message: string,
  flag: boolean
): Response<IResponseFormat> => {
  return res.json({ message: message, success: flag });
};


// Common code block to send fetched data in response json
const fetchResponseFunc = (
  res: Response,
  data: { success: boolean; result: unknown | null },
  message?:string
) => {
  if (data.success) {
    res.json({ success: true, message:message,  result: data.result });
  } else {
    res.json({ success: false, message:message });
  }
};

// Common code block to send status message in response json for update and insert operation

const createUpdateCodeBlock = (res: Response, data: { success:boolean }) => {
  if (data.success) {
    res.json({ success: true, messsage: "All Ok" });
  } else {
    res.json({ success: false, message: "Something went wrong...." });
  }
};


// code block to show validation error message 
const validationStatus = (res:Response,next:NextFunction,error?:Joi.ValidationError)=>{
  if(error){
    res.json({success:false, message:error.message})
  }
  else{
    next();
  }
}

// function for common format return object 
const returnObjectFunction = async(flag:boolean, message?:string, data?:unknown)=>{

  return { success:flag, message:message, result:data}
}

export {
  genPassword,
  commonResJson,
  fetchResponseFunc,
  createUpdateCodeBlock,
  validationStatus,
  returnObjectFunction
};

