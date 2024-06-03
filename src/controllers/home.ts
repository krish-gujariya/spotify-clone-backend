import { Request, Response } from "express";
import { logger } from "../utils/pino";
import {
  IAlbumData,
  IArtistData,
  IReqQuerryId,
  ISongInsertdata,
  IUserData,
} from "../types/generalInterface";
import {
  createUpdateCodeBlock,
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
} from "../services/prismaCreate";
import {
  fetchAlbumData,
  fetchAllGenres,
  fetchAllSongData,
  fetchArtistData,
  fetchLikedSongs,
  fetchPlayedSong,
  fetchPlaylists,
  fetchUserData,
  songsTotalListener,
} from "../services/prismaRead";
import {
  updateAlbum,
  updateArtist,
  updateSong,
  updateUser,
} from "../services/prismaUpdate";
import { deleteUser } from "../services/prismaDelete";
import { reducedPlaylistSongObject, reducedSongTotalListener, reducingPlaydeSongs } from "./reduceObject";

const homePage = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (error) {
    logger.error(error);
  }
};

const insertUser = async (req: Request, res: Response): Promise<void> => {
  const userData: IUserData = req.body;
  const data = await insertUserData(userData);
  fetchResponseFunc(res,data, data.message)
};

const insertArtist = async (req: Request, res: Response): Promise<void> => {
  const artistData: IArtistData = req.body;
  const data = await insertArtistData(artistData);
  fetchResponseFunc(res,data,data.message)
};

const insertAlbum = async (req: Request, res: Response) => {
  const albumData: IAlbumData = req.body;
  const data = await insertAlbumData(albumData);
  createUpdateCodeBlock(res, data);
};

const insertSong = async (req: Request, res: Response) => {
  const songData: ISongInsertdata = req.body;
  const data = await insertSongData(songData);
  createUpdateCodeBlock(res, data);
};

const createPlaylists = async (req: Request, res: Response) => {
  const { name, user_id }: { name: string; user_id: number } = req.body;
  const data = await insertPlaylistData(name, user_id);
  fetchResponseFunc(res, data, data.message);
};

const insertSongInPlaylistRecord = async (req: Request, res: Response) => {
  const { id, idArray }:{id:number, idArray:number[]} = req.body;
  const data = await insertSongInPlaylist(id,idArray);
  fetchResponseFunc(res, data, data.message);
};

const insertPlayedSongRecord =  async (req: Request, res: Response) => {
  const { id, idArray }:{id:number, idArray:number[]} = req.body;
  const data = await insertPLayedSongs(id,idArray);
  fetchResponseFunc(res, data, data.message);
};

const insertFollowers = async (req: Request, res: Response) => {
  const { id, idArray }:{id:number, idArray:number[]} = req.body;
  const data = await insertArtistFollowers(id,idArray);
  fetchResponseFunc(res, data, data.message);
};

const showFetchedGenres = async (req: Request, res: Response) => {
  const data = await fetchAllGenres();
  fetchResponseFunc(res, data);
};

const showFetcheUser = async (req: Request, res: Response) => {
  const id = req.body.id;
  const data = await fetchUserData(id);
  fetchResponseFunc(res, data);
};

const showFetchArtist = async (req: Request, res: Response) => {
  const data = await fetchArtistData();
  fetchResponseFunc(res, data);
};

const showAlbumData = async (req: Request, res: Response) => {
  const data = await fetchAlbumData();
  fetchResponseFunc(res, data);
};

const showSongsData = async (req: Request, res: Response) => {
  const data = await fetchAllSongData();
  fetchResponseFunc(res, data);
};

const showPlayedSongData = async (req: Request, res: Response) => {
  const {id}:IReqQuerryId = req.query as IReqQuerryId
  const data = await reducingPlaydeSongs(parseInt(id));
  fetchResponseFunc(res, data);
};

const showTotalSongListen = async (req: Request, res: Response) => {
  const data = await reducedSongTotalListener();
  fetchResponseFunc(res, data, data.message);
}

const showLikedSongData = async (req: Request, res: Response) => {
  const {id}:IReqQuerryId = req.query as IReqQuerryId
  const data = await fetchLikedSongs(parseInt(id));
  fetchResponseFunc(res, data, data.message);
};

const showPlaylistsData = async (req: Request, res: Response) => {
  const {id}:IReqQuerryId = req.query as IReqQuerryId ;
    const data = await fetchPlaylists(parseInt(id));
    fetchResponseFunc(res, data, data.message);
};

const showSongsOfPlaylist =  async (req: Request, res: Response) => {
  const name:string = req.query.name as string ;
  const data = await reducedPlaylistSongObject(name);
  fetchResponseFunc(res, data, data.message);
};

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
  deleteuser,
  showPlayedSongData,
  showLikedSongData,
  createPlaylists,
  showPlaylistsData,
  insertSongInPlaylistRecord,
  showSongsOfPlaylist,
  insertPlayedSongRecord,
  showTotalSongListen,
  insertFollowers
};
