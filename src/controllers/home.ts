import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { fetchAllGenres, insertArtistData,  insertUserData } from "../services/prismaCRUD";
import { IArtistData, IUserData } from "../types/generalInterface";
import { commonResJson } from "../utils/usefullFunction";

const homePage = (req:Request, res:Response)=>{
    try {
        res.render("home");
    } catch (error) {
        logger.error(error)        
    }
}



const insertUser  = async(req:Request, res:Response):Promise<void>=>{
    const userData:IUserData = req.body;
    

    const data =   await insertUserData(userData);
    if(data.success){
        commonResJson(res,"All Ok", true)
    }
    else{
        commonResJson(res,"Something went wrong...", false)
        
    }
}

const insertArtist = async(req:Request, res:Response):Promise<void>=>{
    const artistData:IArtistData = req.body;
    
    const data = await insertArtistData(artistData);

    if(data.success){
        commonResJson(res,"All Ok", true)

    }else{
        commonResJson(res,"Something went wrong...", false)


    }
}



const showFetchedGenres = async(req:Request,res:Response)=>{

    const data = await fetchAllGenres();
    if(data.success){
        res.json({success:true, data:data.result})
    }
    else{
        res.json({success:false, data:null})
    }

}


export {homePage, insertUser, insertArtist, showFetchedGenres}