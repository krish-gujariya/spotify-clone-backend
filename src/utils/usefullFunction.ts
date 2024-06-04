import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import Joi from "joi";

// Function for generate hash password
const genPassword = async (passString: string) => {
  return await bcrypt.hash(passString, 10);
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
  fetchResponseFunc,
  validationStatus,
  returnObjectFunction
};

