import bcrypt from "bcrypt";
import { Response } from "express";
import { IResponseFormat } from "../types/coreModuleExtendedInterface";

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

const commonResJsonFail = (res: Response) => {
  return res.json({ message: "Something went Wrong...", success: false });
};

const commonResJsonSuccess = (res: Response) => {
  return res.json({ message: "All OK", success: true });
};

// Common code block to send fetched data in response json
const fetchResponseFunc = (
  res: Response,
  data: { success: boolean; result: unknown | null }
) => {
  if (data.success) {
    res.json({ success: true, result: data.result });
  } else {
    res.json({ success: false, result: null });
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

export {
  genPassword,
  commonResJson,
  commonResJsonFail,
  commonResJsonSuccess,
  fetchResponseFunc,
  createUpdateCodeBlock
};
