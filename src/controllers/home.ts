import { Request, Response } from "express";
import joi from "joi";

import { logger } from "../utils/pino";

import {
  IAlbumData,
  IArtistData,
  ISongInsertdata,
  IUserData,
} from "../types/generalInterface";
import {
  commonResJsonFail,
  commonResJsonSuccess,
  createUpdateCodeBlock,
  fetchResponseFunc,
  validationErrorCodeBlock,
} from "../utils/usefullFunction";
import {
  insertAlbumData,
  insertArtistData,
  insertSongData,
  insertUserData,
} from "../services/prismaCreate";
import {
  fetchAlbumData,
  fetchAllGenres,
  fetchAllSongData,
  fetchArtistData,
  fetchUserData,
} from "../services/prismaRead";
import {
  updateAlbum,
  updateArtist,
  updateSong,
  updateUser,
} from "../services/prismaUpdate";
import { deleteUser } from "../services/prismaDelete";

const homePage = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (error) {
    logger.error(error);
  }
};

// Insertion orerations
const insertUserSchema = joi.object().keys({
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
  dob: joi.date().max("01-01-2005"),
});
const insertUser = async (req: Request, res: Response): Promise<void> => {
  const { error, value }: { error?: joi.ValidationError; value: IUserData } =
    insertUserSchema.validate(req.body);
  if (error) {
    validationErrorCodeBlock(res, error.message);
  } else {
    const data = await insertUserData(value);
    createUpdateCodeBlock(res, data);
  }
};

const artistInsertSchema = joi.object().keys({
  name: joi.string(),
  genre: joi.number(),
});

const insertArtist = async (req: Request, res: Response): Promise<void> => {
  const { error, value }: { error?: joi.ValidationError; value: IArtistData } =
    artistInsertSchema.validate(req.body);
  if (error) {
    validationErrorCodeBlock(res, error.message);
  } else {
    const data = await insertArtistData(value);

    createUpdateCodeBlock(res, data);
  }
};

const albumInsertSchema = joi.object().keys({
  artist_id: joi.number(),
  release_date: joi.date(),
  name: joi.string(),
});

const insertAlbum = async (req: Request, res: Response) => {
  const { error, value }: { error?: joi.ValidationError; value: IAlbumData } =
    albumInsertSchema.validate(req.body);
  if (error) {
    validationErrorCodeBlock(res, error.message);
  } else {
    const data = await insertAlbumData(value);
    createUpdateCodeBlock(res, data);
  }
};

const insertSongSchema = joi.object().keys({
  artist_id: joi.number(),
  genre_id: joi.number(),
  album_id: joi.number(),
  duration: joi.number().max(15),
  name: joi.string(),
});

const insertSong = async (req: Request, res: Response) => {
  const {
    error,
    value,
  }: { error?: joi.ValidationError; value: ISongInsertdata } =
    insertSongSchema.validate(req.body);
  if (error) {
    validationErrorCodeBlock(res, error.message);
  } else {
    const data = await insertSongData(value);
    createUpdateCodeBlock(res, data);
  }
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
  const { name, id, artistId }: { name: string; id: number; artistId: number } =
    req.body;
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
  console.log(id);

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
};
