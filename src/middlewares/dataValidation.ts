import { NextFunction, Request, Response } from "express";
import { validationStatus } from "../utils/usefullFunction";
import {
  commonValidationSchema,
  insertAlbumSchema,
  insertArtistSchema,
  insertSongSchema,
  insertUserSchema,
  playlistSongsValidationSchema,
  userArtistIdValidationSchema,
  userSongsIdSchema,
} from "./validationSchema";

// User Validation
const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = insertUserSchema.validate(req.body);
  validationStatus(res, next, error);
};

// Artist Validation
const artistValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = insertArtistSchema.validate(req.body);
  validationStatus(res, next, error);
};

// Album Validation
const albumValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = insertAlbumSchema.validate(req.body);
  validationStatus(res, next, error);
};

// Song Validaotion
const songValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = insertSongSchema.validate(req.body);
  validationStatus(res, next, error);
};

//common Validatoin Function for insert update where common cvariable is passed
const commonValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commonValidationSchema.validate(req.body);
  validationStatus(res, next, error);
};

const commonValidationOnUrl = (req: Request, res: Response, next: NextFunction) => {
    const { error } = commonValidationSchema.validate(req.query);
  validationStatus(res, next, error);
};

// Validation on Inserting in songs in playlist.
const songInPlaylistValidate = (req: Request, res: Response, next: NextFunction) => {  
  const { error } = playlistSongsValidationSchema.validate(req.body);
validationStatus(res, next, error);
};

const userArtistValidation = (req: Request, res: Response, next: NextFunction) => {  
  const { error } = userArtistIdValidationSchema.validate(req.body);
validationStatus(res, next, error);
};

const userSongValidation =  (req: Request, res: Response, next: NextFunction) => {  
  const { error } = userSongsIdSchema.validate(req.body);
validationStatus(res, next, error);
};

export {
  userValidation,
  artistValidation,
  albumValidation,
  songValidation,
  commonValidation,
  commonValidationOnUrl,
  songInPlaylistValidate,
  userArtistValidation,
  userSongValidation
};
