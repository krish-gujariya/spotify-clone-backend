import { Request, Response } from "express";
import { updateAlbum, updateArtist, updateSong, updateUser } from "../services/prismaUpdate";
import {  fetchResponseFunc } from "../utils/usefullFunction";
import { deleteUser } from "../services/prismaDelete";

const updateUserData = async (req: Request, res: Response) => {
    const { name, id }: { name: string; id: number } = req.body;
    const data = await updateUser(name, id);
    fetchResponseFunc(res, data);
  };
  
  const updateArtistData = async (req: Request, res: Response) => {
    const { name, id }: { name: string; id: number } = req.body;
    const data = await updateArtist(name, id);
    fetchResponseFunc(res, data);
  };
  
  const updateAlbumData = async (req: Request, res: Response) => {
    const { name, id, artistId }: { name: string; id: number; artistId: number } = req.body;
    const data = await updateAlbum(name, id, artistId);
    fetchResponseFunc(res, data);
  };
  
  const updateSongData = async (req: Request, res: Response) => {
    const { name, id }: { name: string; id: number } = req.body;
    const data = await updateSong(name, id);
    fetchResponseFunc(res, data);
  };
  
  // const deleteuser = async (req: Request, res: Response) => {
  //   const { id }: { id: number } = req.body;
  //   const data = await deleteUser(id);
  //   fetchResponseFunc(res, data);
  // };
  
  export {
    
    updateAlbumData,
    updateArtistData,
    updateSongData,
    updateUserData,
    // deleteuser,
  
  };
  