import { Request, Response } from "express";
import { deleteFollowerRecord, deleteLikeRecord } from "../services/prismaDelete";
import { fetchResponseFunc } from "../utils/usefullFunction";

const unfollowArtist = async (req: Request, res: Response) => {
    const {user_id, artist_id}:{user_id:number, artist_id:number} = req.body;
    const data = await deleteFollowerRecord(user_id, artist_id);
    fetchResponseFunc(res, data, data.message);
  };


const unLikeSong = async (req: Request, res: Response) => {
  const {user_id, song_id}:{user_id:number, song_id:number} = req.body;
  const data = await deleteLikeRecord(user_id, song_id);
  fetchResponseFunc(res, data, data.message);
};

export {unfollowArtist, unLikeSong}