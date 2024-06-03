import { Request, Response } from "express";
import { updateAlbum, updateArtist, updateSong, updateUser } from "../services/prismaUpdate";
import { createUpdateCodeBlock } from "../utils/usefullFunction";
import { deleteUser } from "../services/prismaDelete";

const updateUserData = async (req: Request, res: Response) => {
    const { name, id }: { name: string; id: number } = req.body;
    const data = await updateUser(name, id);
    createUpdateCodeBlock(res, data);
  };
  
  const updateArtistData = async (req: Request, res: Response) => {
    const { name, id }: { name: string; id: number } = req.body;
    const data = await updateArtist(name, id);
    createUpdateCodeBlock(res, data);
  };
  
  const updateAlbumData = async (req: Request, res: Response) => {
    const { name, id, artistId }: { name: string; id: number; artistId: number } = req.body;
    const data = await updateAlbum(name, id, artistId);
    createUpdateCodeBlock(res, data);
  };
  
  const updateSongData = async (req: Request, res: Response) => {
    const { name, id }: { name: string; id: number } = req.body;
    const data = await updateSong(name, id);
    createUpdateCodeBlock(res, data);
  };
  
  const deleteuser = async (req: Request, res: Response) => {
    const { id }: { id: number } = req.body;
    const data = await deleteUser(id);
    createUpdateCodeBlock(res, data);
  };
  
  export {
    
    updateAlbumData,
    updateArtistData,
    updateSongData,
    updateUserData,
    deleteuser,
  
  };
  