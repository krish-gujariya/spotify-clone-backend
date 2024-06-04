import { Request, Response } from "express";
import {
  IAlbumData,
  IArtistData,
  ISongInsertdata,
  IUserData,
} from "../types/generalInterface";

import {
  fetchResponseFunc,
} from "../utils/usefullFunction";
import {
  insertAlbumData,
  insertArtistData,
  insertArtistFollowers,
  insertPLayedSongs,
  insertPlaylistData,
  insertSongData,
  insertSongInPlaylist,
  insertUserData,
  insertLikedSongData
} from "../services/prismaCreate";

const insertUser = async (req: Request, res: Response): Promise<void> => {
  const userData: IUserData = req.body;
  const data = await insertUserData(userData);
  fetchResponseFunc(res, data, data.message);
};

const insertArtist = async (req: Request, res: Response): Promise<void> => {
  const artistData: IArtistData = req.body;
  const data = await insertArtistData(artistData);
  fetchResponseFunc(res, data, data.message);
};

const insertAlbum = async (req: Request, res: Response) => {
  const albumData: IAlbumData = req.body;
  const data = await insertAlbumData(albumData);
  fetchResponseFunc(res, data, data.message);
};

const insertSong = async (req: Request, res: Response) => {
  const songData: ISongInsertdata = req.body;
  const data = await insertSongData(songData);
  fetchResponseFunc(res, data, data.message);
};

const createPlaylists = async (req: Request, res: Response) => {
  const { name, user_id }: { name: string; user_id: number } = req.body;
  const data = await insertPlaylistData(name, user_id);
  fetchResponseFunc(res, data, data.message);
};

const insertSongInPlaylistRecord = async (req: Request, res: Response) => {
  const { id, idArray }: { id: number; idArray: number[] } = req.body;
  const data = await insertSongInPlaylist(id, idArray);
  fetchResponseFunc(res, data, data.message);
};

const insertPlayedSongRecord = async (req: Request, res: Response) => {
  const { id, idArray }: { id: number; idArray: number[] } = req.body;
  const data = await insertPLayedSongs(id, idArray);
  fetchResponseFunc(res, data, data.message);
};

const insertFollowers = async (req: Request, res: Response) => {
  const { id, idArray }: { id: number; idArray: number[] } = req.body;
  const data = await insertArtistFollowers(id, idArray);
  fetchResponseFunc(res, data, data.message);
};

const insertLikesRecord = async (req: Request, res: Response) => {
  const { id, idArray }: { id: number; idArray: number[] } = req.body;
  const data = await insertLikedSongData(id, idArray);
  fetchResponseFunc(res, data, data.message);
};

export {
  insertUser,
  insertArtist,
  insertAlbum,
  insertSong,
  createPlaylists,
  insertSongInPlaylistRecord,
  insertPlayedSongRecord,
  insertFollowers,
  insertLikesRecord
};
