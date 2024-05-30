import { Request, Response } from "express";
import { logger } from "../utils/pino";

import { IAlbumData, IArtistData, ISongInsertdata, IUserData } from "../types/generalInterface";
import {
  commonResJsonFail,
  commonResJsonSuccess,
  createUpdateCodeBlock,
  fetchResponseFunc,
} from "../utils/usefullFunction";
import {
  insertAlbumData,
  insertArtistData,
  insertSongData,
  insertUserData,
} from "../services/prismaCreate";
import { fetchAlbumData, fetchAllGenres, fetchAllSongData, fetchArtistData, fetchUserData } from "../services/prismaRead";
import { updateAlbum, updateArtist, updateSong, updateUser } from "../services/prismaUpdate";
import {deleteUser} from "../services/prismaDelete"


const homePage = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (error) {
    logger.error(error);
  }
};

// Insertion orerations
const insertUser = async (req: Request, res: Response): Promise<void> => {
  const userData: IUserData = req.body;

  const data = await insertUserData(userData);
  if (data.success) {
    commonResJsonSuccess(res);
  } else {
    commonResJsonFail(res);
  }
};

const insertArtist = async (req: Request, res: Response): Promise<void> => {
  const artistData: IArtistData = req.body;

  const data = await insertArtistData(artistData);

  if (data.success) {
    commonResJsonSuccess(res);
  } else {
    commonResJsonFail(res);
  }
};

const insertAlbum = async (req: Request, res: Response) => {
  const albumData: IAlbumData = req.body;
  const data = await insertAlbumData(albumData);
  if (data.success) {
    console.log("jbjhbjhbjhbjhbjhbbh");

    commonResJsonSuccess(res);
  } else {
    commonResJsonFail(res);
  }
};

const insertSong = async (req: Request, res: Response) => {
  const insertSongObject: ISongInsertdata =
    req.body;
  const data = await insertSongData(insertSongObject);

  if (data.success) {
    commonResJsonSuccess(res);
  } else {
    commonResJsonFail(res);
  }
};

const showFetchedGenres = async (req: Request, res: Response) => {
  const data = await fetchAllGenres();
 fetchResponseFunc(res,data)
};


const showFetcheUser = async(req:Request, res:Response)=>{
  const id = req.body.id
  const data = await fetchUserData(id);
  
  fetchResponseFunc(res,data);
}

const showFetchArtist = async(req:Request, res:Response) =>{
  const data = await fetchArtistData();
  fetchResponseFunc(res,data);
}

const showAlbumData = async(req:Request, res:Response) =>{
  const data = await fetchAlbumData();
  fetchResponseFunc(res,data);
}


const showSongsData = async(req:Request, res:Response) =>{
  const data = await fetchAllSongData();
  fetchResponseFunc(res,data);
}


const updateUserData = async(req:Request, res:Response)=>{

  const {name,id}:{name:string, id:number}= req.body;
  const data = await updateUser(name,id);
  createUpdateCodeBlock(res,data);

}

const updateArtistData = async(req:Request, res:Response)=>{
  const {name,id}:{name:string, id:number} = req.body;
  const data = await updateArtist(name,id);
  createUpdateCodeBlock(res,data);
}


const  updateAlbumData = async(req:Request, res:Response)=>{
  const {name,id, artistId}:{name:string, id:number, artistId:number} = req.body;
  const data =await updateAlbum(name,id,artistId);
  createUpdateCodeBlock(res,data);
}


const updateSongData = async (req:Request, res:Response)=>{
  const {name,id}:{name:string, id:number}= req.body;
  const data = await updateSong(name,id);
  createUpdateCodeBlock(res,data);
  
}

const deleteuser = async(req:Request, res:Response) =>{
  const {id}:{id:number} = req.body;
  console.log(id);
  
  const data = await  deleteUser(id)
  createUpdateCodeBlock(res,data);

}

export {
  homePage,
  insertUser,
  insertArtist,
  insertAlbum,
  insertSong,
  showFetchedGenres,
  showFetcheUser,
  showFetchArtist,
  showAlbumData,
  showSongsData,
  updateAlbumData,
  updateArtistData,
  updateSongData,
  updateUserData,
  deleteuser
};
